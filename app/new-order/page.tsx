import { getProductGroups, getZones } from "../actions/catalog-data";
import { NewOrder } from "./new-order";

export const revalidate = 60;

export default async function About() {
  const [productGroups, zones] = await Promise.all([
    getProductGroups(),
    getZones(),
  ]);
  return (
    <>
      <h1 className="text-center">הזמנה חדשה</h1>
      <NewOrder productGroups={productGroups} zones={zones}></NewOrder>
    </>
  );
}
