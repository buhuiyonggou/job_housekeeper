/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `application_id` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
ADD COLUMN     "assignedToUserId" VARCHAR(255),
DROP COLUMN "application_id",
ADD COLUMN     "application_id" SERIAL NOT NULL,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE INDEX "Application_application_id_idx" ON "Application"("application_id");

-- CreateIndex
CREATE INDEX "Application_assignedToUserId_idx" ON "Application"("assignedToUserId");
