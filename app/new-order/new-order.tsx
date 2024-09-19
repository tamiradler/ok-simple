"use client";

import { ProductGroups } from "../actions/catalog-data";

export function NewOrder({
  productGroups,
}: {
  productGroups: ProductGroups[];
}) {
  return (
    <>
      {productGroups.map((pg) => (
        <div key={pg.name}>{pg.name}</div>
      ))}
    </>
  );
}
