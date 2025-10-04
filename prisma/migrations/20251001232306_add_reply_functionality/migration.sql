-- AlterTable
ALTER TABLE "public"."posts" ADD COLUMN     "parent_id" TEXT;

-- CreateIndex
CREATE INDEX "posts_parent_id_idx" ON "public"."posts"("parent_id");

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
