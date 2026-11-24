import { UnauthorizedException } from "@nestjs/common";
import { authenticator } from "otplib";
import * as QRCode from "qrcode";
import * as jwt from "jsonwebtoken";
import { db } from "../../prisma/db";

const getUserById = (id: number) =>
  db.orm.public.User.where({ id }).first();

export const setup2FA = async (userId: number) => {
  const user = await getUserById(userId);
  if (!user) throw new UnauthorizedException();

  const secret = authenticator.generateSecret();
  await db.orm.public.User.where({ id: userId }).update({
    twoFactorSecret: secret,
  });

  if (!user?.email) throw new UnauthorizedException();

  const otpauth = authenticator.keyuri(user.email, "fish-app", secret);
  return { qr: await QRCode.toDataURL(otpauth) };
};

export const enable2FA = async (userId: number, code: string) => {
  const user = await getUserById(userId);
  if (!user?.twoFactorSecret || !authenticator.check(code, user.twoFactorSecret))
    throw new UnauthorizedException("Невірний код");

  return db.orm.public.User.where({ id: userId }).update({
    twoFactorEnabled: true,
  });
};

export const verify2FA = async (tempToken: string, code: string) => {
  const payload = jwt.verify(tempToken, process.env.JWT_SECRET!) as any;
  if (payload.step !== "2fa") throw new UnauthorizedException();

  const user = await getUserById(payload.sub);
  if (!user?.twoFactorSecret || !authenticator.check(code, user.twoFactorSecret))
    throw new UnauthorizedException("Невірний код");

  return {
    accessToken: jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    ),
  };
};