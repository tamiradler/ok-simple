import { getOrder } from "@/app/actions/orders";

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(Number(params.orderId));
  return <><h1>Order id {order?.incrementalId}</h1></>;
}
