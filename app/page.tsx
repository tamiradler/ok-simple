import { prisma } from "@/prisma/prisma";

export const revalidate = 0;

export default async function Home() {
  const count = await prisma.order.count();

  return (
    <>There are {count} orders currently</>
  );
}
