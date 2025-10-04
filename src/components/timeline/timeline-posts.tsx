import { getTimelinePosts } from '@/lib/dal/posts';
import { PostCard } from '@/components/post-card';
import { Suspense } from 'react';

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
  );
}

async function TimelinePostsContent() {
  const posts = await getTimelinePosts();
  
  return (
    <div className="flex flex-col divide-y">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export function TimelinePosts() {
  return (
    <Suspense fallback={<TimelineSkeleton />}>
      <TimelinePostsContent />
    </Suspense>
  );
}
