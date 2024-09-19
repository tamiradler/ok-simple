"use client";

import { useState } from "react";
import { City, ProductGroups, ProductType, Zone } from "../actions/catalog-data";

export function NewOrder({
  productGroups,
  zones,
}: {
  productGroups: ProductGroups[];
  zones: Zone[];
}) {
  const [selectedGroup, setSelectedGroup] = useState<ProductGroups | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [selectedZone, setZone] = useState<Zone | null>(null);

  const [selectedCity, setCity] = useState<City | null>(null);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = e.target.value;
    const group = productGroups.find((group) => group.id === groupId) || null;
    setSelectedGroup(group);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    const product =
      selectedGroup?.productTypes.find((product) => product.id === productId) ||
      null;
    setSelectedProduct(product);
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zoneId = e.target.value;
    const zone = zones.find((zone) => zone.id === zoneId) || null;
    setZone(zone);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    const city = selectedZone?.cities.find((city) => city.id === cityId) || null;
    setCity(city);
  };

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        Select Product Group
      </label>
      <select
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleGroupChange}
        value={selectedGroup?.id || ""}
      >
        <option value="">Select Group</option>
        {productGroups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <label className="block text-sm font-medium text-gray-700">
        Select Product Type
      </label>
      <select
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleProductChange}
        value={selectedProduct?.id || ""}
      >
        <option value="">Select Product</option>
        {selectedGroup?.productTypes.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <label className="block text-sm font-medium text-gray-700">
        Select Zone
      </label>
      <select
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleZoneChange}
        value={selectedZone?.id || ""}
      >
        <option value="">Select Zone</option>
        {zones.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {zone.name}
          </option>
        ))}
      </select>
      <label className="block text-sm font-medium text-gray-700">
        Select City
      </label>
      <select
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleCityChange}
        value={selectedCity?.id || ""}
      >
        <option value="">Select City</option>
        {selectedZone?.cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
}
