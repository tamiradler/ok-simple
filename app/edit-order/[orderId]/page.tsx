import { getProductGroups, getZones } from "@/app/actions/catalog-data";
import { getOrder } from "@/app/actions/orders";
import { NewOrder } from "@/app/new-order/new-order";

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(Number(params.orderId));
  const [productGroups, zones] = await Promise.all([
    getProductGroups(),
    getZones(),
  ]);
  return (
    <>
      <h1>Order id {order?.incrementalId}</h1>
      <NewOrder
        productGroups={productGroups}
        zones={zones}
        order={{
          cityId: order?.cityid || "",
          corporateId: order?.corporateId || 0,
          customerName: order?.customerName || "",
          date: order?.date || new Date(),
          discount: order?.discount.toNumber() || 0,
          price: order?.price.toNumber() || 0,
          productTypeId: order?.productTypeid || "",
        }}
      ></NewOrder>
    </>
  );
}
