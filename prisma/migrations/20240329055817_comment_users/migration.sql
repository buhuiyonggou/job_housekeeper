/*
  Warnings:

  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Application_userId_idx";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "userId";
