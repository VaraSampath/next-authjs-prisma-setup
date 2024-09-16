"use server";

import prisma from "@/lib/db";
import { hash } from "bcryptjs";
export async function register(name: string, email: string, password: string) {
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
}
