import { getProductGroups, getZones } from "../actions/catalog-data";
import { NewOrder } from "./new-order";

export const revalidate = 60;

export default async function About() {
  const [productGroups, zones] = await Promise.all([
    getProductGroups(),
    getZones(),
  ]);
  return <NewOrder productGroups={productGroups} zones={zones}></NewOrder>;
}
