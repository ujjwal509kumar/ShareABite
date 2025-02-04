import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function PUT(req, { params }) {
  const { id } = params;
  const { volunteerId, adminEmail } = await req.json();

  try {
    const listing = await prisma.foodListing.update({
      where: { id },
      data: {
        status: 'ASSIGNED',
        volunteer: {
          connect: { id: volunteerId }
        }
      },
      include: {
        user: true,
        volunteer: true,
        address: true
      },
    });

    // Send emails
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: listing.user.email,
      subject: 'Volunteer Assigned for Your Food Listing',
      html: `
        <h1>Volunteer Assigned</h1>
        <p>Your food listing (${listing.name}) has been assigned to a volunteer.</p>
        <h2>Volunteer Details:</h2>
        <p>Name: ${listing.volunteer.fullName}</p>
        <p>Email: ${listing.volunteer.email}</p>
        <p>Phone: ${listing.volunteer.mobile}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: listing.volunteer.email,
      subject: 'New Food Listing Assignment',
      html: `
        <h1>New Food Listing Assignment</h1>
        <p>You've been assigned to collect a food listing.</p>
        <h2>Listing Details:</h2>
        <p>Name: ${listing.name}</p>
        <p>Quantity: ${listing.quantity}</p>
        <p>Expiration Date: ${new Date(listing.expirationDate).toLocaleDateString()}</p>
        <h2>Pickup Address:</h2>
        <p>${listing.address.street}, ${listing.address.city}</p>
        <p>${listing.address.state} - ${listing.address.postalCode}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to assign volunteer' },
      { status: 500 }
    );
  }
}