"use server";

import { prisma } from "@/prisma/prisma";

export type Order = {
  corporateId: number;
  customerName: string;
  date: Date;
  discount: number;
  price: number;
  cityId: string;
  productTypeId: string;
};

export async function createNewOrder(order: Order) {
  await prisma.order.create({
    data: {
      corporateId: order.corporateId,
      customerName: order.customerName,
      date: order.date,
      discount: order.discount,
      price: order.price,
      cityid: order.cityId,
      productTypeid: order.productTypeId,
    },
  });
}

export async function getOrdersCount(): Promise<number> {
  return await prisma.order.count();
}

export async function getOrders(pageSize: number, page: number) {
  return await prisma.order.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      city: true,
      productType: true,
    }
  });
}
