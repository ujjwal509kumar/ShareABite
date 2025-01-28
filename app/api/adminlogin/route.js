import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const admin = await prisma.admin.findUnique({
            where: { email },
        });

        if (!admin) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
            });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
            });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return new Response(
            JSON.stringify({ token }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}
