import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params;
  const { password } = await req.json();

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: "Password reset successful" });
}

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params;

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  return NextResponse.json({ email: resetToken.user.email });
}

