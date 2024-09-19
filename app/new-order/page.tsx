import { getProductGroups } from "../actions/catalog-data";

export default async function About() {
  const productGroups = await getProductGroups();
  return (
    <>
      {productGroups.map((pg) => (
        <div key={pg.name}>{pg.name}</div>
      ))}
    </>
  );
}
