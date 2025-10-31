import { PrismaClient, ProgramKey } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { campContent } from '../src/content/camp'
import { innovatorProContent } from '../src/content/innovator-pro'
import { aiAssistantsContent } from '../src/content/ai-assistants'

const prisma = new PrismaClient()

const admins = [
  {
    name: 'Ayu Hartono',
    email: 'ayu@clevio.com',
    password: 'clevio-ayu',
  },
  {
    name: 'Bagas Pratama',
    email: 'bagas@clevio.com',
    password: 'clevio-bagas',
  },
  {
    name: 'Nadia Santosa',
    email: 'nadia@clevio.com',
    password: 'clevio-nadia',
  },
]

async function seedAdmins() {
  for (const admin of admins) {
    const passwordHash = await bcrypt.hash(admin.password, 12)

    await prisma.admin.upsert({
      where: { email: admin.email },
      update: { name: admin.name, passwordHash },
      create: {
        name: admin.name,
        email: admin.email,
        passwordHash,
      },
    })
  }
}

async function seedPrograms() {
  const entries = [
    {
      program: ProgramKey.INNOVATOR_CAMP,
      titleId: 'Innovator Camp',
      titleEn: 'Innovator Camp',
      descriptionId:
        'Program yang menumbuhkan kreativitas dan kepemimpinan inovator muda melalui eksperimen teknologi.',
      descriptionEn:
        'A program that grows young innovators by blending creativity, leadership, and hands-on technology experiments.',
      ctaLabelId: 'Pelajari Innovator Camp',
      ctaLabelEn: 'Explore Innovator Camp',
      imageAltId: 'Logo Innovator Camp',
      imageAltEn: 'Innovator Camp Logo',
    },
    {
      program: ProgramKey.INNOVATOR_PRO,
      titleId: 'Innovator Pro',
      titleEn: 'Innovator Pro',
      descriptionId:
        'Pendampingan profesional untuk merancang inovasi berkelanjutan dan mengoptimalkan kerja dengan AI.',
      descriptionEn:
        'Professional guidance to design sustainable innovations while optimising work with AI.',
      ctaLabelId: 'Pelajari Innovator Pro',
      ctaLabelEn: 'Explore Innovator Pro',
      imageAltId: 'Logo Innovator Pro',
      imageAltEn: 'Innovator Pro Logo',
    },
    {
      program: ProgramKey.AI_ASSISTANTS,
      titleId: 'Clevio AI Assistants',
      titleEn: 'Clevio AI Assistants',
      descriptionId:
        'Platform asisten AI yang berpihak pada manusia untuk mempercepat produktivitas tanpa kehilangan empati.',
      descriptionEn:
        'A human-first AI assistant platform that accelerates productivity without losing empathy.',
      ctaLabelId: 'Pelajari AI Assistants',
      ctaLabelEn: 'Explore AI Assistants',
      imageAltId: 'Logo Clevio AI Assistants',
      imageAltEn: 'Clevio AI Assistants Logo',
    },
  ]

  for (const entry of entries) {
    await prisma.programContent.upsert({
      where: { program: entry.program },
      update: { ...entry },
      create: entry,
    })
  }
}

async function seedProgramPages() {
  const entries = [
    { program: ProgramKey.INNOVATOR_CAMP, data: campContent },
    { program: ProgramKey.INNOVATOR_PRO, data: innovatorProContent },
    { program: ProgramKey.AI_ASSISTANTS, data: aiAssistantsContent },
  ]

  for (const entry of entries) {
    await prisma.programPageContent.upsert({
      where: { program: entry.program },
      update: { data: entry.data },
      create: {
        program: entry.program,
        data: entry.data,
      },
    })
  }
}

async function main() {
  await seedAdmins()
  await seedPrograms()
  await seedProgramPages()
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
