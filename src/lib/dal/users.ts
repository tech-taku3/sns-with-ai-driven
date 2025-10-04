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
}

export async function getUserByUsername(username: string): Promise<UserProfile | null> {
  return await prisma.user.findUnique({
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
      }
    }
  })
}


