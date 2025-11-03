import { NewPostInput } from './new-post-input'
import { TimelinePosts } from './timeline-posts'

export async function TimelineContent({ userId }: { userId?: string }) {
  return (
    <main className="flex-1 border-x min-h-screen max-w-[600px]">
      <div className="flex flex-col">
        <NewPostInput />
        <TimelinePosts userId={userId} />
      </div>
    </main>
  )
}