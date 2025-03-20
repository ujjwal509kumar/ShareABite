import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const blogId = parseInt(id, 10);
        if (isNaN(blogId)) {
            return NextResponse.json(
                { error: "Invalid blog ID format" },
                { status: 400 }
            );
        }
        const deletedBlog = await prisma.blogs.delete({
            where: { id: blogId }
        });

        return NextResponse.json(
            { message: "Blog deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}