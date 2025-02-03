import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const volunteers = await prisma.volunteer.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        area: true,
        isActive: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(volunteers);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch volunteers' },
      { status: 500 }
    );
  }
}