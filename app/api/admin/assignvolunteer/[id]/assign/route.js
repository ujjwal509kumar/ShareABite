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
    // Get volunteer details
    const volunteer = await prisma.volunteer.findUnique({
      where: { id: volunteerId },
    });

    if (!volunteer) {
      return NextResponse.json(
        { error: 'Volunteer not found' },
        { status: 404 }
      );
    }

    // Update food listing with volunteer email
    const listing = await prisma.foodListing.update({
      where: { id },
      data: {
        status: 'ASSIGNED',
        volunteerEmail: volunteer.email,
      },
      include: {
        user: true,
        address: true,
      },
    });

    // Get lister details
    const lister = await prisma.user.findUnique({
      where: { id: listing.userId },
    });

    // Email to food lister
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: listing.user.email,
      subject: 'Volunteer Assigned for Your Food Listing',
      html: `
        <h1>Volunteer Assigned</h1>
        <p>Your food listing (${listing.name}) has been assigned to a volunteer.</p>
        <h2>Volunteer Details:</h2>
        <p>Name: ${volunteer.fullName}</p>
        <p>Email: ${volunteer.email}</p>
        <p>Phone: ${volunteer.mobile}</p>
      `,
    });

    // Email to volunteer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: volunteer.email,
      subject: 'New Food Listing Assignment',
      html: `
        <h1>New Food Listing Assignment</h1>
        <p>You've been assigned to collect a food listing:</p>
        <h2>Listing Details:</h2>
        <p>Name: ${listing.name}</p>
        <p>Quantity: ${listing.quantity}</p>
        <p>Expiration: ${new Date(listing.expirationDate).toLocaleDateString()}</p>
        <h2>Pickup Address:</h2>
        <p>${listing.address.street}, ${listing.address.city}</p>
        <p>${listing.address.state} - ${listing.address.postalCode}</p>
        <h2>Contact Information:</h2>
        <p>Lister Name: ${lister.name}</p>
        <p>Lister Email: ${lister.email}</p>
      `,
    });

    return NextResponse.json({ 
      success: true,
      data: {
        ...listing,
        volunteer: {
          fullName: volunteer.fullName,
          email: volunteer.email,
          mobile: volunteer.mobile
        }
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to assign volunteer',
        details: error.message 
      },
      { status: 500 }
    );
  }
}