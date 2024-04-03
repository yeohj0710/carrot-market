"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호를 인증해 주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="phone" type="number" placeholder="전화번호" required />
        <Input
          name="token"
          type="number"
          placeholder="인증번호"
          required
          min={100000}
          max={999999}
        />
        <Button text="인증하기" />
      </form>
    </div>
  );
}
