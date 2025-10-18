import { NewPostInput } from './new-post-input'
import { TimelinePosts } from './timeline-posts'

export function TimelineContent() {
  return (
    <main className="flex-1 border-x min-h-screen max-w-[600px]">
      <div className="flex flex-col">
        <NewPostInput />
        <TimelinePosts />
      </div>
    </main>
  )
}