"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  return {
    errors: [
      "아이디가 존재하지 않거나 비밀번호가 올바르지 않습니다.",
      "비밀번호 길이가 너무 짧습니다.",
    ],
  };
};
