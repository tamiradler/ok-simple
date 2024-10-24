"use client";

import { useState } from "react";
import {
  City,
  ProductGroups,
  ProductType,
  Zone,
} from "../actions/catalog-data";
import { createNewOrder, Order } from "../actions/orders";
import { useRouter } from "next/navigation";

export function NewOrder({
  productGroups,
  zones,
  order,
}: {
  productGroups: ProductGroups[];
  zones: Zone[];
  order?: Order;
}) {
  const [selectedGroup, setSelectedGroup] = useState<ProductGroups | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const initialZone = zones.find((zone) =>
    zone.cities.some((city) => city.id == order?.cityId)
  );
  const [selectedZone, setZone] = useState<Zone | null>(initialZone || null);
  const initialCity = zones
    .flatMap((zone) => zone.cities)
    .find((city) => city.id == order?.cityId);
  const [selectedCity, setCity] = useState<City | null>(initialCity || null);
  const [customerName, setCustomerName] = useState(order?.customerName || "");
  const [corporateId, setCorporateId] = useState(order?.corporateId.toString() || "");
  const [price, setPrice] = useState(order?.price || 0);
  const [discount, setDiscount] = useState(order?.discount || 0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    const city =
      selectedZone?.cities.find((city) => city.id === cityId) || null;
    setCity(city);
  };

  const handleSubmit = () => {
    if (!selectedCity) {
      alert("City not selected");
      return;
    }
    if (!selectedProduct) {
      alert("City not selected");
      return;
    }
    const regex = /^\d{9}$/;
    if (!corporateId || regex.test(corporateId)) {
      alert("corporateId not valid");
      return;
    }
    if (!customerName) {
      alert("customerName not selected");
      return;
    }
    setIsLoading(true);
    createNewOrder({
      cityId: selectedCity.id,
      corporateId: Number(corporateId),
      customerName,
      date: new Date(),
      discount,
      price,
      productTypeId: selectedProduct.id,
    })
      .then(() => router.push("/"))
      .finally(() => setIsLoading(false));
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
      <label className="block text-sm font-medium text-gray-700">
        Customer Name
      </label>
      <input
        type="text"
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Enter customer name"
      />

      <label className="block text-sm font-medium text-gray-700">
        Corporate ID
      </label>
      <input
        type="text"
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={corporateId}
        onChange={(e) => setCorporateId(e.target.value)}
        placeholder="Enter corporate ID"
      />

      <label className="block text-sm font-medium text-gray-700">Price</label>
      <input
        type="number"
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Enter price"
      />

      <label className="block text-sm font-medium text-gray-700">
        Discount
      </label>
      <input
        type="number"
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={discount}
        onChange={(e) => setDiscount(parseFloat(e.target.value))}
        placeholder="Enter discount"
      />
      <button
        type="button"
        className="w-48 bg-blue-500 text-white mt-5 py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <p className="text-white text-2xl">Saving...</p>
        </div>
      )}
    </>
  );
}
