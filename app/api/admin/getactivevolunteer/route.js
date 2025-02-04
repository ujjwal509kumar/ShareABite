import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const isActive = searchParams.get('isActive') === 'true';

  try {
    const volunteers = await prisma.volunteer.findMany({
      where: { isActive },
      orderBy: { fullName: 'asc' }
    });
    return NextResponse.json(volunteers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch volunteers' },
      { status: 500 }
    );
  }
}