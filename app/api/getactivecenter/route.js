import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  const now = new Date();
  const activeDonations = await prisma.activedonationcenter.findMany({
    where: {
      activeUntil: {
        gt: now,
      },
    },
    orderBy: {
      activeFrom: 'asc',
    },
  });
  return NextResponse.json(activeDonations);
}
