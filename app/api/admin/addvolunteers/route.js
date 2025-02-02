import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const handleError = (error, status = 500) => {
    console.error(error);
    return NextResponse.json(
        { error: error.message || 'Something went wrong' },
        { status }
    );
};

export async function POST(request) {

    try {
        const {
            fullName,
            email,
            mobile,
            gender,
            area,
            address,
            pincode,
        } = await request.json();

        if (!fullName || !email || !mobile || !gender || !area || !address || !pincode) {
            return handleError(new Error('Missing required fields'), 400);
        }

        const existingVolunteer = await prisma.volunteer.findUnique({
            where: { email },
        });

        if (existingVolunteer) {
            return handleError(new Error('Volunteer with this email already exists'), 409);
        }

        const newVolunteer = await prisma.volunteer.create({
            data: {
                fullName,
                email,
                mobile,
                gender,
                area,
                address,
                pincode,
            },
        });

        return NextResponse.json(newVolunteer, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}
