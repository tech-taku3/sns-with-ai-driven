import { prisma } from '@/lib/prisma'

export interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string | null
  profileImageUrl: string | null
  coverImageUrl: string | null
  _count: {
    posts: number
    followers: number
    following: number
  }
  isFollowing?: boolean
}

export async function getUserByUsername(username: string, currentUserId?: string): Promise<UserProfile | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      displayName: true,
      bio: true,
      profileImageUrl: true,
      coverImageUrl: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true
        }
      },
      followers: currentUserId ? {
        where: {
          followerId: currentUserId
        },
        select: {
          id: true
        }
      } : false
    }
  })

  if (!user) {
    return null
  }

  const { followers, ...userWithoutFollowers } = user

  return {
    ...userWithoutFollowers,
    isFollowing: currentUserId ? (followers && followers.length > 0) : false
  }
}


