"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkNickname = (nickname: string) => !nickname.includes("여형준");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueNickname = async (nickname: string) => {
  const user = await db.user.findUnique({
    where: {
      //@ts-ignore
      nickname,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine(checkUniqueEmail, "이미 사용 중인 이메일입니다."),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 3글자 이상이어야 합니다.")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    nickname: z
      .string({
        invalid_type_error: "닉네임은 문자열 형식이어야 합니다.",
        required_error: "닉네임을 입력해 주세요.",
      })
      .min(3, "닉네임은 3글자 이상이어야 합니다.")
      .max(12, "닉네임은 12글자 이하여야 합니다.")
      .trim()
      .refine(checkNickname, "운영자의 이름은 닉네임에 포함할 수 없습니다.")
      .refine(checkUniqueNickname, "이미 사용 중인 닉네임입니다."),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        //@ts-ignore
        nickname: result.data.nickname,
      },
      select: {
        id: true,
      },
    });
    const cookie = await getIronSession(cookies(), {
      cookieName: "test",
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();
    redirect("/profile");
  }
}
