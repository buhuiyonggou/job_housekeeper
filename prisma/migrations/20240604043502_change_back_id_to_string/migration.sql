/*
  Warnings:

  - The primary key for the `Job_Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Job_Providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `employmentType` on table `Job_Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timeAgoPosted` on table `Job_Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job_Collection" DROP CONSTRAINT "Job_Collection_pkey",
ALTER COLUMN "employmentType" SET NOT NULL,
ALTER COLUMN "timeAgoPosted" SET NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Job_Collection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Job_Collection_id_seq";

-- AlterTable
ALTER TABLE "Job_Providers" DROP CONSTRAINT "Job_Providers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "jobId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Job_Providers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Job_Providers_id_seq";
