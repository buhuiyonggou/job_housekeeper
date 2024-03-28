/*
  Warnings:

  - You are about to drop the column `position_number` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "position_number",
ADD COLUMN     "job_info" TEXT,
ADD COLUMN     "position_code" TEXT,
ADD COLUMN     "tracking_link" TEXT;
