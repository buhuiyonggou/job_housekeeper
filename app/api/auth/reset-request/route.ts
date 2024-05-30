import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const token = uuidv4();
    const expiration = addHours(new Date(), 0.5);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expires: expiration,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `To reset your password, please click the following link: ${process.env.NEXT_PUBLIC_URL}/auth/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
  }

  return NextResponse.json({ message: "If the email is registered, you will receive a reset link." });
}
