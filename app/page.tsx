import { prisma } from "@/prisma/prisma";

export default async function Home() {
  const count = await prisma.order.count();

  return (
    <>There are {count} orders currently</>
  );
}
