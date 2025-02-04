import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  try {
    const listings = await prisma.foodListing.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        address: true
      }
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch food listings' },
      { status: 500 }
    );
  }
}