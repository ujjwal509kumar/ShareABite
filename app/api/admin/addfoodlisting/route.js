import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { volunteerName, volunteerMobile, donationCenter, donationLocation, donationType, activeFrom, activeUntil } = await req.json();

    try {
        const newListing = await prisma.activedonationcenter.create({
            data: {
                volunteerName,
                volunteerMobile,
                donationCenter,
                donationLocation,
                donationType,
                activeFrom: new Date(activeFrom),
                activeUntil: new Date(activeUntil),
            },
        });

        return new Response(JSON.stringify(newListing), { status: 200 });
    } catch (error) {
        console.error('Error creating food listing:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
