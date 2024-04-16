"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호를 인증해 주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="인증번호"
            required
            errors={state.error?.formErrors}
          />
        ) : (
          <div className="items-center grid grid-cols-10">
            <span className="col-span-1 ml-1 text-gray-500 text-lg">+82</span>
            <div className="col-span-9">
              <Input
                name="phone"
                type="text"
                placeholder="전화번호"
                required
                errors={state.error?.formErrors}
              />
            </div>
          </div>
        )}
        <Button text={state.token ? "인증하기" : "인증번호 받기"} />
      </form>
    </div>
  );
}
