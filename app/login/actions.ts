"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    errors: ["wrong password", "password is too short"],
  };
};
