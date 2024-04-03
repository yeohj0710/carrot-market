"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("여형준");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "닉네임은 문자열 형식이어야 합니다.",
        required_error: "닉네임을 입력해 주세요.",
      })
      .min(3, "닉네임은 3글자 이상이어야 합니다.")
      .max(12, "닉네임은 12글자 이하여야 합니다.")
      .trim()
      .refine(checkUsername, "운영자의 이름은 닉네임에 포함할 수 없습니다."),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 3글자 이상이어야 합니다.")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
