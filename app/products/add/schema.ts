import { z } from "zod";

export const productSchema = z.object({
  photo: z.string({
    required_error: "상품 이미지 업로드",
  }),
  title: z
    .string({
      required_error: "상품명이 입력되지 않았습니다.",
    })
    .max(50),
  description: z
    .string({
      required_error: "설명이 입력되지 않았습니다.",
    })
    .max(500),
  price: z.coerce.number({
    required_error: "가격이 입력되지 않았습니다.",
  }),
});

export type ProductType = z.infer<typeof productSchema>;
