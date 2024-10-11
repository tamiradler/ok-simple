import { getOrdersCount } from "./actions/orders";

export const revalidate = 0;

export default async function Home() {
  const count = await getOrdersCount();

  return (
    <>There are {count} orders currently</>
  );
}
