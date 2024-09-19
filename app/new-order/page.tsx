import { getProductGroups } from "../actions/catalog-data";
import { NewOrder } from "./new-order";

export default async function About() {
  const productGroups = await getProductGroups();
  return (
    <NewOrder productGroups={productGroups}></NewOrder>
  );
}
