import { getTimelinePosts } from '@/lib/api/posts'
import { PostCard } from '@/components/post-card'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImageIcon, SmileIcon, StickerIcon, ListIcon, CalendarIcon, MapPinIcon } from 'lucide-react'

async function TimelinePosts() {
  const posts = await getTimelinePosts()
  
  return (
    <div className="flex flex-col divide-y">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function CreatePost() {
  return (
    <div className="flex gap-4 p-4 border-b">
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user" />
        <AvatarFallback>Me</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 text-primary">
            <button className="rounded-full p-2 hover:bg-primary/10">
              <ImageIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <StickerIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <ListIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <SmileIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <CalendarIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <MapPinIcon className="h-5 w-5" />
            </button>
          </div>
          <Button size="sm" className="rounded-full px-4">
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export function TimelineContent() {
  return (
    <main className="flex-1 border-x min-h-screen">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <CreatePost />
      </div>
      <Suspense fallback={<TimelineSkeleton />}>
        <TimelinePosts />
      </Suspense>
    </main>
  )
}

function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}