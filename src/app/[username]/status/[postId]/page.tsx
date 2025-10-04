import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { PostDetail } from "@/components/post-detail";
import { getPostById, getPostReplies } from "@/lib/dal/posts";
import { notFound } from "next/navigation";

interface PageProps {
  params: { 
    username: string
    postId: string 
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { username, postId } = params
  
  const [post, replies] = await Promise.all([
    getPostById(postId),
    getPostReplies(postId)
  ])

  if (!post) {
    notFound()
  }

  // ユーザー名の検証（URLのusernameと実際の投稿者のusernameが一致するかチェック）
  if (post.author.username !== username) {
    notFound()
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex w-full lg:w-[1265px] mx-auto">
        <LeftSidebar />
        <main className="flex-1 lg:flex-none lg:w-[600px] lg:min-w-[600px] border-x border-gray-200 dark:border-gray-800">
          <div className="min-w-0">
            <PostDetail post={post} replies={replies} />
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="fixed bottom-0 left-0 right-0 lg:hidden" />
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
