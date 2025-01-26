import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const foodListing = await prisma.foodListing.findUnique({
      where: { id },
      select: {
        imageData: true,
        imageMimeType: true
      }
    });

    if (!foodListing) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return new NextResponse(foodListing.imageData, {
      headers: {
        'Content-Type': foodListing.imageMimeType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });

  } catch (error) {
    console.error('Error fetching food image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}