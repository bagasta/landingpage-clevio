-- CreateTable
CREATE TABLE "ProgramPageContent" (
    "id" TEXT NOT NULL,
    "program" "ProgramKey" NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "ProgramPageContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramPageContent_program_key" ON "ProgramPageContent"("program");

-- AddForeignKey
ALTER TABLE "ProgramPageContent" ADD CONSTRAINT "ProgramPageContent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
