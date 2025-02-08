import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;
  const { adminEmail } = await req.json();

  try {
    const currentListing = await prisma.foodListing.findUnique({
      where: { id }
    });

    if (!currentListing) {
      return NextResponse.json(
        { error: 'Food listing not found' },
        { status: 404 }
      );
    }

    if (currentListing.status !== 'ASSIGNED') {
      return NextResponse.json(
        { error: 'Can only mark ASSIGNED listings as delivered' },
        { status: 400 }
      );
    }

    const updatedListing = await prisma.foodListing.update({
      where: { id },
      data: {
        status: 'DISTRIBUTED',
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true,
      data: updatedListing
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { error: 'Failed to update status', details: error.message },
      { status: 500 }
    );
  }
}