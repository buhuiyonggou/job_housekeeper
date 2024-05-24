/*
  Warnings:

  - You are about to drop the column `app_status` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "app_status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Applied';
