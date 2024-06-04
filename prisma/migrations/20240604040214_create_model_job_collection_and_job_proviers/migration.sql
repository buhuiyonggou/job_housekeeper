-- CreateTable
CREATE TABLE "Job_Collection" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "timeAgoPosted" TEXT NOT NULL,
    "salaryRange" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job_Providers" (
    "id" TEXT NOT NULL,
    "jobProvider" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Job_Providers_pkey" PRIMARY KEY ("id")
);
