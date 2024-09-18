"use server";

import { prisma } from "@/prisma/prisma";

export type ProductType = {
  id: string;
  name: string;
  productGroupid: string;
};

export type ProductGroups = {
  productTypes: ProductType[];
  id: string;
  name: string;
};

export async function getProductGroups(): Promise<ProductGroups[]> {
  const productGroups = await prisma.productGroup.findMany({
    include: { productTypes: true },
  });
  return productGroups;
}
