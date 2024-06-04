/*
  Warnings:

  - You are about to drop the column `timeAgoPosted` on the `Job_Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job_Collection" DROP COLUMN "timeAgoPosted",
ADD COLUMN     "datePosted" TEXT,
ALTER COLUMN "employmentType" DROP NOT NULL;
