import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// 共通関数: ユーザーが存在するかチェック
async function isUserExists(clerkId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { clerkId }
  })
  return user !== null
}

export async function POST(req: NextRequest) {
  try {
    // Webhook署名検証（Clerkの公式ライブラリが自動検証）
    const evt = await verifyWebhook(req)

    const { id } = evt.data
    const eventType = evt.type
    
    // イベントタイプのホワイトリスト検証
    const validEvents = ['user.created', 'user.updated', 'user.deleted']
    if (!validEvents.includes(eventType)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ Unknown webhook event type: ${eventType}`)
      }
      return new Response('Event type not handled', { status: 200 })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Received webhook: ${eventType} (ID: ${id})`)
    }

    // Handle user.created event
    if (eventType === 'user.created') {
      const { 
        id: userId, 
        email_addresses, 
        primary_email_address_id,
        first_name, 
        last_name, 
        username, 
        image_url 
      } = evt.data

      if (process.env.NODE_ENV === 'development') {
        console.log('User data:', JSON.stringify(evt.data, null, 2))
        console.log('Email addresses:', email_addresses)
        console.log('Primary email ID:', primary_email_address_id)
      }

      // Get the primary email address
      interface EmailAddress {
        id: string;
        email_address: string;
      }
      const primaryEmail = email_addresses?.find((email: EmailAddress) => email.id === primary_email_address_id)
      const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address

      // テストイベントの場合はメールアドレスがないため、ダミーのメールを使用
      if (!email) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('No email found for user, using placeholder email for test event:', userId)
        }
        const placeholderEmail = `${userId}@clerk-test.local`
        const placeholderUsername = username || `user_${userId.substring(5, 15)}`
        
        // Create user in database using Prisma with placeholder email
        try {
          const user = await prisma.user.create({
            data: {
              clerkId: userId,
              email: placeholderEmail,
              username: placeholderUsername,
              displayName: `${first_name || ''} ${last_name || ''}`.trim() || placeholderUsername,
              profileImageUrl: image_url,
            }
          })

          if (process.env.NODE_ENV === 'development') {
            console.log('User created in database (test event):', user)
          }
        } catch (error) {
          console.error('Error creating user in database:', error)
          return new Response('Failed to create user', { status: 500 })
        }
      } else {
        // Create user in database using Prisma
        try {
          const user = await prisma.user.create({
            data: {
              clerkId: userId,
              email: email,
              username: username || email.split('@')[0],
              displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || email.split('@')[0],
              profileImageUrl: image_url,
            }
          })

          if (process.env.NODE_ENV === 'development') {
            console.log('User created in database:', user)
          }
        } catch (error) {
          console.error('Error creating user in database:', error)
          return new Response('Failed to create user', { status: 500 })
        }
      }
    }

    // Handle user.updated event
    if (eventType === 'user.updated') {
      const { 
        id: userId, 
        email_addresses, 
        primary_email_address_id,
        first_name, 
        last_name, 
        username, 
        image_url 
      } = evt.data

      // Get the primary email address
      interface EmailAddress {
        id: string;
        email_address: string;
      }
      const primaryEmail = email_addresses?.find((email: EmailAddress) => email.id === primary_email_address_id)
      const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address

      if (!email) {
        if (process.env.NODE_ENV === 'development') {
          console.error('No primary email found for user:', userId)
          console.error('Available email addresses:', email_addresses)
        } else {
          console.error('No primary email found in webhook event')
        }
        return new Response('No primary email found', { status: 400 })
      }

      // Update user in database using Prisma
      try {
        // Check if user exists
        if (!(await isUserExists(userId))) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`User with clerkId ${userId} not found in database, skipping update`)
          }
          return new Response('User not found in database', { status: 404 })
        }

        const user = await prisma.user.update({
          where: { clerkId: userId },
          data: {
            email: email,
            username: username || email.split('@')[0],
            displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || email.split('@')[0],
            profileImageUrl: image_url,
          }
        })

        if (process.env.NODE_ENV === 'development') {
          console.log('User updated in database:', user)
        }
      } catch (error) {
        console.error('Error updating user in database:', error)
        return new Response('Failed to update user', { status: 500 })
      }
    }

    // Handle user.deleted event
    if (eventType === 'user.deleted') {
      const { id: userId } = evt.data

      // Delete user from database using Prisma
      try {
        if (!userId) {
          console.error('No user ID found in user.deleted event')
          return new Response('No user ID found', { status: 400 })
        }
        
        // Check if user exists
        if (!(await isUserExists(userId))) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`User with clerkId ${userId} not found in database, skipping deletion`)
          }
          return new Response('User not found in database', { status: 404 })
        }

        await prisma.user.delete({
          where: { clerkId: userId }
        })

        if (process.env.NODE_ENV === 'development') {
          console.log('User deleted from database:', userId)
        }
      } catch (error) {
        console.error('Error deleting user from database:', error)
        return new Response('Failed to delete user', { status: 500 })
      }
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (err) {
    // Webhook検証失敗（署名が不正、または不正なリクエスト）
    console.error('❌ Webhook verification failed:', err)
    
    // 本番環境では詳細を隠す
    if (process.env.NODE_ENV === 'production') {
      return new Response('Unauthorized', { status: 401 })
    }
    
    return new Response('Webhook verification failed', { status: 401 })
  }
}