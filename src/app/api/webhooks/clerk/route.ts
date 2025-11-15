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
  // TODO: デバッグ後に削除 - Webhookエンドポイントが呼ばれたことを記録（本番環境でも出力される）
  console.log('📥 Webhook endpoint called')
  
  try {
    // TODO: デバッグ後に削除 - 環境変数の存在チェック（開発環境のみのログ、実際の値は出力していないため安全）
    // バックエンドのAPI Routeなので、環境変数にアクセスするのは問題ない
    const hasWebhookSecret = !!process.env.WEBHOOK_SECRET
    const hasDatabaseUrl = !!process.env.DATABASE_URL
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Environment check:', {
        hasWebhookSecret,
        hasDatabaseUrl,
        nodeEnv: process.env.NODE_ENV
      })
    }
    
    // Webhook署名検証（Clerkの公式ライブラリが自動検証）
    const evt = await verifyWebhook(req)

    const { id } = evt.data
    const eventType = evt.type
    
    // イベントタイプのホワイトリスト検証
    const validEvents = ['user.created', 'user.updated', 'user.deleted']
    if (!validEvents.includes(eventType)) {
      console.warn(`⚠️ Unknown webhook event type: ${eventType}`)
      return new Response('Event type not handled', { status: 200 })
    }

    // Webhook受信を記録（本番環境ではIDを出力しない）
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Webhook received: ${eventType} (ID: ${id})`)
      console.log(`Full webhook data:`, JSON.stringify(evt.data, null, 2))
    } else {
      console.log(`✅ Webhook received: ${eventType}`)
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

          // 本番環境では詳細情報を出力しない（情報漏洩防止）
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ User created (test event): ${user.username} (${user.id})`)
            console.log('User details:', user)
          } else {
            console.log('✅ User created (test event)')
          }
        } catch (error) {
          // エラーの詳細を記録（デバッグ用）
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Error creating user in database:', error)
            if (error instanceof Error) {
              console.error('Error name:', error.name)
              console.error('Error message:', error.message)
              console.error('Error stack:', error.stack)
            }
          } else {
            // 本番環境ではエラータイプのみ記録
            const errorType = error instanceof Error ? error.name : 'Unknown'
            console.error(`❌ Error creating user in database: ${errorType}`)
          }
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

          // 本番環境では詳細情報を出力しない（情報漏洩防止）
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ User created: ${user.username} (${user.id})`)
            console.log('User details:', user)
          } else {
            console.log('✅ User created')
          }
        } catch (error) {
          // エラーの詳細を記録（デバッグ用）
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Error creating user in database:', error)
            if (error instanceof Error) {
              console.error('Error name:', error.name)
              console.error('Error message:', error.message)
              console.error('Error stack:', error.stack)
            }
          } else {
            // 本番環境ではエラータイプのみ記録
            const errorType = error instanceof Error ? error.name : 'Unknown'
            console.error(`❌ Error creating user in database: ${errorType}`)
          }
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

        // 本番環境では詳細情報を出力しない（情報漏洩防止）
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ User updated: ${user.username} (${user.id})`)
          console.log('User details:', user)
        } else {
          console.log('✅ User updated')
        }
      } catch (error) {
        // エラーの詳細を記録（デバッグ用）
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Error updating user in database:', error)
          if (error instanceof Error) {
            console.error('Error name:', error.name)
            console.error('Error message:', error.message)
          }
        } else {
          const errorType = error instanceof Error ? error.name : 'Unknown'
          console.error(`❌ Error updating user in database: ${errorType}`)
        }
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

        // 本番環境では詳細情報を出力しない（情報漏洩防止）
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ User deleted: ${userId}`)
        } else {
          console.log('✅ User deleted')
        }
      } catch (error) {
        // エラーの詳細を記録（デバッグ用）
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Error deleting user from database:', error)
          if (error instanceof Error) {
            console.error('Error name:', error.name)
            console.error('Error message:', error.message)
          }
        } else {
          const errorType = error instanceof Error ? error.name : 'Unknown'
          console.error(`❌ Error deleting user from database: ${errorType}`)
        }
        return new Response('Failed to delete user', { status: 500 })
      }
    }

    console.log(`✅ Webhook processed successfully: ${eventType}`)
    return new Response('Webhook processed successfully', { status: 200 })
  } catch (err) {
    // Webhook検証失敗（署名が不正、または不正なリクエスト）
    // 本番環境では詳細なエラー情報を出力しない（情報漏洩防止）
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Webhook verification failed:', err)
      console.error('Error details:', err instanceof Error ? err.message : 'Unknown error')
      return new Response('Webhook verification failed', { status: 401 })
    } else {
      console.error('❌ Webhook verification failed')
      return new Response('Unauthorized', { status: 401 })
    }
  }
}