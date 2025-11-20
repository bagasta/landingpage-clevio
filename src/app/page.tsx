import { ProgramKey, ProgramPageStatus } from '@prisma/client';

import LandingPage from '@/components/landing-page';
import { db } from '@/lib/db';

type ProgramRecord = {
  program: ProgramKey;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  ctaLabelId: string;
  ctaLabelEn: string;
  imageAltId: string;
  imageAltEn: string;
};

async function getProgramContent(): Promise<ProgramRecord[]> {
  const records = await db.programContent.findMany({
    orderBy: { program: 'asc' },
    select: {
      program: true,
      titleId: true,
      titleEn: true,
      descriptionId: true,
      descriptionEn: true,
      ctaLabelId: true,
      ctaLabelEn: true,
      imageAltId: true,
      imageAltEn: true,
    },
  });

  return records;
}

export default async function Home() {
  const programContent = await getProgramContent();
  const programStatuses = await db.programPageContent.findMany({
    select: { program: true, status: true },
  });
  const statusMap = programStatuses.reduce(
    (map, entry) => {
      map[entry.program] = entry.status;
      return map;
    },
    {} as Partial<Record<ProgramKey, ProgramPageStatus>>
  );
  return <LandingPage programContent={programContent} programStatuses={statusMap} />;
}
