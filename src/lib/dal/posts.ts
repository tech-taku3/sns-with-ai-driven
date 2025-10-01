import { prisma } from '@/lib/prisma'

export interface Post {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  mediaUrl: string | null
  author: {
    id: string
    username: string
    displayName: string
    profileImageUrl: string | null
  }
  _count: {
    likes: number
  }
}

export async function getTimelinePosts(): Promise<Post[]> {
  return await prisma.post.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          profileImageUrl: true
        }
      },
      _count: {
        select: {
          likes: true
        }
      }
    },
    take: 20
  })
}

export async function getUserPostsByUsername(username: string): Promise<Post[]> {
  return await prisma.post.findMany({
    where: {
      isPublished: true,
      author: { username }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          profileImageUrl: true
        }
      },
      _count: { select: { likes: true } }
    },
    take: 20
  })
}
