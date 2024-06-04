/*
  Warnings:

  - The primary key for the `Job_Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Job_Collection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Job_Providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Job_Providers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `jobId` on the `Job_Providers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Job_Collection" DROP CONSTRAINT "Job_Collection_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Job_Collection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Job_Providers" DROP CONSTRAINT "Job_Providers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "jobId",
ADD COLUMN     "jobId" INTEGER NOT NULL,
ADD CONSTRAINT "Job_Providers_pkey" PRIMARY KEY ("id");
