import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const description = formData.get('description');
    const quantity = parseInt(formData.get('quantity'));
    const expirationDate = new Date(formData.get('expirationDate'));
    const imageFile = formData.get('image');
    
    const address = {
      street: formData.get('street'),
      city: formData.get('city'),
      state: formData.get('state'),
      postalCode: formData.get('postalCode'),
      landmark: formData.get('landmark')
    };

    if (!name || !description || !quantity || !expirationDate || !imageFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const imageBuffer = await imageFile.arrayBuffer();
    const imageData = Buffer.from(imageBuffer);


    const foodListing = await prisma.foodListing.create({
      data: {
        name,
        description,
        quantity,
        expirationDate,
        imageData,
        imageMimeType: imageFile.type,
        address: {
          create: address
        },
        user: {
          connect: { email: session.user.email }
        }
      },
      include: {
        address: true
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        data: {
          ...foodListing,
          imageData: undefined 
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating food listing:', error);
    return NextResponse.json(
      { error: 'Failed to create food listing' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}