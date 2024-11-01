import { prisma } from "@/prisma/prisma";
import {
  PopularCustomer,
  PopularProductGroups,
  TotalPriceByCity,
} from "./Dashboard";

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

  const cityIds = groupedData.map((item) => item.cityid);

  const citys = await prisma.city.findMany({
    where: {
      id: { in: cityIds },
    },
  });

  return groupedData.map((entry) => {
    const city = citys.find((city) => city.id == entry.cityid);
    return {
      city: city?.name || "Unknown",
      totalPrice: entry._sum.price?.toNumber(),
    };
  });
}

async function mostPopularProductGroups() {
  const groupBy = await prisma.order.groupBy({
    by: ["productTypeid"],
    _count: {
      productTypeid: true,
    },
    orderBy: {
      _count: {
        productTypeid: "desc",
      },
    },
    take: 10,
  });

  const productIds = groupBy.map((item) => item.productTypeid);

  const productTypes = await prisma.productType.findMany({
    where: {
      id: { in: productIds },
    },
  });

  return groupBy.map((item) => {
    const productType = productTypes.find(
      (productType) => productType.id == item.productTypeid
    );
    return {
      productTypeName: productType?.name,
      count: item._count.productTypeid,
    };
  });
}

async function mostPopularCustomer() {
  const groupBy = await prisma.order.groupBy({
    by: ["customerName"],
    _count: {
      customerName: true,
    },
    orderBy: {
      _count: {
        customerName: "desc",
      },
    },
    take: 10,
  });

  return groupBy.map((item) => ({
    name: item.customerName,
    count: item._count.customerName,
  }));
}

async function getMonthlyEarnings() {
  const monthlyEarnings = await prisma.$queryRaw`
  SELECT DATE_TRUNC('month', "date") AS month, 
         SUM("price") AS total_price, 
         COUNT(*) AS order_count
  FROM "Order"
  WHERE "date" >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months'
  GROUP BY month
  ORDER BY month ASC;
`;
  return monthlyEarnings;
}

export default async function Page() {
  const [totalPriceByCity, popularProductGroups, popularCustomer, monthlyEarnings] =
    await Promise.all([
      getTotalPriceByCity(),
      mostPopularProductGroups(),
      mostPopularCustomer(),
      getMonthlyEarnings()
    ]);

    console.log("", monthlyEarnings);
    

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TotalPriceByCity data={totalPriceByCity}></TotalPriceByCity>
        <PopularProductGroups
          data={popularProductGroups}
        ></PopularProductGroups>
        <PopularCustomer data={popularCustomer}></PopularCustomer>
      </div>
    </>
  );
}
