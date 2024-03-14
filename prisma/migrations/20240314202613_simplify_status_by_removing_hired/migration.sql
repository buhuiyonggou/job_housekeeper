-- CreateEnum
CREATE TYPE "Term" AS ENUM ('Fall', 'Winter', 'Spring', 'Summer');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Full_Time', 'Part_Time', 'Internship', 'Contract', 'Temporary', 'Freelance');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Interview', 'Offer', 'Rejected');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Software', 'Hardware', 'Accounting', 'Accounting_Service', 'Finance', 'Risk_Management', 'Marketing', 'Sales', 'Human_Resources', 'Customer_Service', 'Legal', 'Education', 'Engineering', 'Healthcare', 'Art_and_Design', 'Data_Science', 'Product_Management', 'Operations', 'Supply_Chain', 'Manufacturing', 'Quality_Assurance', 'Research_and_Development', 'IT_Support', 'Public_Relations', 'Real_Estate', 'Construction', 'Consulting', 'Environmental', 'Agriculture', 'Hospitality', 'Tourism', 'Transportation', 'Logistics', 'Media_and_Communications', 'Non_Profit', 'Government', 'Security', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "application_id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "job_title" TEXT NOT NULL,
    "position_number" TEXT,
    "type" "Type" NOT NULL,
    "term" "Term" NOT NULL,
    "year" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" "Status" NOT NULL DEFAULT 'Applied',

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application"("userId");
