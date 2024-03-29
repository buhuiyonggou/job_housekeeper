/*
  Warnings:

  - You are about to drop the column `tracking_link` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "tracking_link",
ADD COLUMN     "track_link" TEXT;
