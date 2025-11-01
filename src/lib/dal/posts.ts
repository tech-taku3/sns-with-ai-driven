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
    replies: number
  }
  isLiked?: boolean
}

export async function getTimelinePosts(userId?: string): Promise<Post[]> {
  const posts = await prisma.post.findMany({
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
          likes: true,
          replies: true
        }
      },
      likes: userId ? {
        where: {
          userId: userId
        },
        select: {
          id: true
        }
      } : false
    },
    take: 20
  })

  return posts.map(post => ({
    ...post,
    isLiked: userId ? (post.likes && post.likes.length > 0) : false,
    likes: undefined as any
  }))
}

export async function getUserPostsByUsername(username: string, userId?: string): Promise<Post[]> {
  const posts = await prisma.post.findMany({
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
      _count: { select: { likes: true, replies: true } },
      likes: userId ? {
        where: {
          userId: userId
        },
        select: {
          id: true
        }
      } : false
    },
    take: 20
  })

  return posts.map(post => ({
    ...post,
    isLiked: userId ? (post.likes && post.likes.length > 0) : false,
    likes: undefined as any
  }))
}

export async function getPostById(postId: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: {
      id: postId,
      isPublished: true
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
      _count: { select: { likes: true, replies: true } }
    }
  })
}

export async function getPostReplies(postId: string): Promise<Post[]> {
  return await prisma.post.findMany({
    where: {
      parentId: postId,
      isPublished: true
    },
    orderBy: { createdAt: 'asc' },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          profileImageUrl: true
        }
      },
      _count: { select: { likes: true, replies: true } }
    }
  })
}
