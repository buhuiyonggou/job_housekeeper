-- CreateEnum
CREATE TYPE "Term" AS ENUM ('Fall', 'Winter', 'Spring', 'Summer');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Full_Time', 'Part_Time', 'Internship', 'Contract', 'Temporary', 'Freelance');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Interview', 'Offer', 'Rejected', 'Updating');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Software', 'Hardware', 'Accounting', 'Accounting_Service', 'Finance', 'Risk_Management', 'Marketing', 'Sales', 'Human_Resources', 'Customer_Service', 'Legal', 'Education', 'Engineering', 'Healthcare', 'Art_and_Design', 'Data_Science', 'Product_Management', 'Operations', 'Supply_Chain', 'Manufacturing', 'Quality_Assurance', 'Research_and_Development', 'IT_Support', 'Public_Relations', 'Real_Estate', 'Construction', 'Consulting', 'Environmental', 'Agriculture', 'Hospitality', 'Tourism', 'Transportation', 'Logistics', 'Media_and_Communications', 'Non_Profit', 'Government', 'Security', 'Other');

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT DEFAULT 'Anonymous',
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "gender" TEXT,
    "description" TEXT,
    "linkedin" TEXT,
    "personal_site" TEXT,
    "image" TEXT,
    "resume" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job_Collection" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "employmentType" TEXT,
    "datePosted" TEXT,
    "salaryRange" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job_Providers" (
    "id" SERIAL NOT NULL,
    "jobProvider" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Job_Providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Application" (
    "application_id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_info" TEXT,
    "track_link" TEXT,
    "position_code" TEXT,
    "type" "Type" NOT NULL,
    "term" "Term" NOT NULL,
    "year" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Applied',
    "application_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedToUserId" VARCHAR(255),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job_Collection" ADD CONSTRAINT "Job_Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job_Providers" ADD CONSTRAINT "Job_Providers_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job_Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
