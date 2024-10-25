import { prisma } from "@/prisma/prisma";
import { Dashboard } from "./Dashboard";

async function getTotalPriceByCity() {
  const groupedData = await prisma.order.groupBy({
    by: ["cityid"],
    _sum: {
      price: true,
    },
    orderBy: {
      _sum: {
        price: "desc",
      },
    },
  });

  const result = await Promise.all(
    groupedData.map(async (entry) => {
      const city = await prisma.city.findUnique({
        where: { id: entry.cityid },
        select: { name: true },
      });
      return {
        city: city?.name || "Unknown",
        totalPrice: entry._sum.price?.toNumber(),
      };
    })
  );
  return result;
}

export default async function Page() {
  const res = await getTotalPriceByCity();
  return (
    <>
      <Dashboard data={res}></Dashboard>
    </>
  );
}
