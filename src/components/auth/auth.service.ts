import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { authenticator } from "otplib";
import * as QRCode from "qrcode";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { db } from "../../prisma/db";

const SECRET: string =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error("JWT_SECRET is not set");
  })();
if (!SECRET) throw new Error("JWT_SECRET is not set");

const signAccess = (user: { id: number; role: string | null }) =>
  jwt.sign(
    { sub: String(user.id), role: user.role ?? "user", typ: "access" },
    SECRET,
    { expiresIn: "1h", algorithm: "HS256" },
  );

export const getUserById = (id: number) => {
  return db.orm.public.User.where({ id }).first();
};

export const getUserByEmail = (email: string) => {
  return db.orm.public.User.where({ email }).first();
};

export const updateUser = (id: number, data: Record<string, unknown>) => {
  return db.orm.public.User.where({ id }).update(data);
};

const signTemp = (userId: number) =>
  jwt.sign({ sub: String(userId), typ: "2fa" }, SECRET, {
    expiresIn: "5m",
    algorithm: "HS256",
  });

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user || !user.password)
    throw new UnauthorizedException("Невірний email або пароль");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new UnauthorizedException("Невірний email або пароль");

  if (user.twoFactorEnabled) {
    return { requires2FA: true, tempToken: signTemp(user.id) };
  }
  return { accessToken: signAccess(user) };
};

export const setup2FA = async (userId: number) => {
  const user = await getUserById(userId);
  if (!user?.email) throw new UnauthorizedException();
  if (user.twoFactorEnabled)
    throw new UnauthorizedException("2FA вже увімкнена");

  const secret = authenticator.generateSecret();
  await db.orm.public.User.where({ id: userId }).update({
    twoFactorSecret: secret,
  });

  const otpauth = authenticator.keyuri(user.email, "fish-app", secret);
  return { qr: await QRCode.toDataURL(otpauth) };
};

export const enable2FA = async (userId: number, code: string) => {
  const user = await getUserById(userId);
  if (
    !user?.twoFactorSecret ||
    !authenticator.check(code, user.twoFactorSecret)
  )
    throw new UnauthorizedException("Невірний код");

  await db.orm.public.User.where({ id: userId }).update({
    twoFactorEnabled: true,
  });
  return { enabled: true };
};

export const verify2FA = async (tempToken: string, code: string) => {
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(tempToken, SECRET, {
      algorithms: ["HS256"],
    }) as jwt.JwtPayload;
  } catch {
    throw new UnauthorizedException();
  }
  if (payload.typ !== "2fa") throw new UnauthorizedException();

  const user = await getUserById(Number(payload.sub));
  if (
    !user?.twoFactorEnabled ||
    !user.twoFactorSecret ||
    !authenticator.check(code, user.twoFactorSecret)
  )
    throw new UnauthorizedException("Невірний код");

  return { accessToken: signAccess(user) };
};
export const register = async (email: string, password: string) => {
  const existing = await getUserByEmail(email);
  if (existing) throw new ConflictException("Email вже зайнятий");

  const hash = await bcrypt.hash(password, 10);
  const user = await db.orm.public.User.create({
    email,
    password: hash,
    role: "user",
    twoFactorEnabled: false,
  });

  return { id: user.id, email: user.email };
};
