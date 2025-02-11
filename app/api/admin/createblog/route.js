import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { slug, ...blogData } = await request.json();

        const existingBlog = await prisma.blogs.findUnique({
            where: { slug },
        });

        if (existingBlog) {
            return new Response(
                JSON.stringify({ message: 'Slug must be unique' }),
                { status: 400 }
            );
        }
        const newBlog = await prisma.blogs.create({
            data: {
                ...blogData,
                slug,
                date: new Date(blogData.date),
            },
        });

        return new Response(JSON.stringify(newBlog), { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        const message =
            error.message && error.message.includes('Unique constraint')
                ? 'Slug already exists'
                : 'Internal server error';
        return new Response(JSON.stringify({ message }), { status: 500 });
    }
}
