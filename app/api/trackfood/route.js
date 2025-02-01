import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    try {
        const foodListings = await prisma.foodListing.findMany({
            where: { userId },
            include: { address: true },
        });

        return new Response(JSON.stringify(foodListings), { status: 200 });
    } catch (error) {
        console.error("Error fetching food listings:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch food listings" }), { status: 500 });
    }
}
