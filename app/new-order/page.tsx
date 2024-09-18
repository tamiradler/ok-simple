"use client"

import { useEffect, useState } from "react";
import { getProductGroups, ProductGroups } from "../actions/catalog-data";

export default function About() {
  const [productGroups, setProductGroups] = useState<ProductGroups[]>([]);
  useEffect(() => {
    getProductGroups().then(productGroups => setProductGroups(productGroups));
  }, []);
  return <>
    {productGroups.map(pg => <div>{pg.name}</div>)}
  </>;
}
