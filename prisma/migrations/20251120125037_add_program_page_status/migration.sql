-- CreateEnum
CREATE TYPE "ProgramPageStatus" AS ENUM ('PUBLISHED', 'DEVELOPMENT');

-- AlterTable
ALTER TABLE "ProgramPageContent"
ADD COLUMN     "status" "ProgramPageStatus" NOT NULL DEFAULT 'PUBLISHED';
