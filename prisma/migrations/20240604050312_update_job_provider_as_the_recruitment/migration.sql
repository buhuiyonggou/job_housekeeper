/*
  Warnings:

  - Added the required column `jobProvider` to the `Job_Providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job_Providers" ADD COLUMN     "jobProvider" TEXT NOT NULL;
