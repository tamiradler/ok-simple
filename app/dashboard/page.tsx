import { prisma } from "@/prisma/prisma";
import { Dashboard } from "./Dashboard";

export const revalidate = 0;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Dashboard data={res}></Dashboard>
      </div>
    </>
  );
}
