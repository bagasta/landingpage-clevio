-- CreateEnum
CREATE TYPE "ProgramKey" AS ENUM ('INNOVATOR_CAMP', 'INNOVATOR_PRO', 'AI_ASSISTANTS');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramContent" (
    "id" TEXT NOT NULL,
    "program" "ProgramKey" NOT NULL,
    "titleId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "ctaLabelId" TEXT NOT NULL,
    "ctaLabelEn" TEXT NOT NULL,
    "imageAltId" TEXT NOT NULL,
    "imageAltEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "ProgramContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramContent_program_key" ON "ProgramContent"("program");

-- AddForeignKey
ALTER TABLE "ProgramContent" ADD CONSTRAINT "ProgramContent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
