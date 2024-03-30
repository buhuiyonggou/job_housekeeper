/*
  Warnings:

  - You are about to drop the column `Status` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "Status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Applied';
