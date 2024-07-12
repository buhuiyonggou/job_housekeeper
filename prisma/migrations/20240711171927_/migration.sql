-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_threadId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
