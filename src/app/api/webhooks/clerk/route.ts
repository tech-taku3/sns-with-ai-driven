import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)

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

      console.log('User data:', JSON.stringify(evt.data, null, 2))
      console.log('Email addresses:', email_addresses)
      console.log('Primary email ID:', primary_email_address_id)

      // Get the primary email address
      const primaryEmail = email_addresses?.find((email: any) => email.id === primary_email_address_id)
      const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address

      // テストイベントの場合はメールアドレスがないため、ダミーのメールを使用
      if (!email) {
        console.warn('No email found for user, using placeholder email for test event:', userId)
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
              passwordHash: '', // Clerk handles authentication, so we don't need a password
            }
          })

          console.log('User created in database (test event):', user)
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
              passwordHash: '', // Clerk handles authentication, so we don't need a password
            }
          })

          console.log('User created in database:', user)
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
      const primaryEmail = email_addresses?.find((email: any) => email.id === primary_email_address_id)
      const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address

      if (!email) {
        console.error('No primary email found for user:', userId)
        console.error('Available email addresses:', email_addresses)
        return new Response('No primary email found', { status: 400 })
      }

      // Update user in database using Prisma
      try {
        const user = await prisma.user.update({
          where: { clerkId: userId },
          data: {
            email: email,
            username: username || email.split('@')[0],
            displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || email.split('@')[0],
            profileImageUrl: image_url,
          }
        })

        console.log('User updated in database:', user)
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
        await prisma.user.delete({
          where: { clerkId: userId }
        })

        console.log('User deleted from database:', userId)
      } catch (error) {
        console.error('Error deleting user from database:', error)
        return new Response('Failed to delete user', { status: 500 })
      }
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}