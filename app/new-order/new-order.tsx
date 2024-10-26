"use client";

import { useState } from "react";
import {
  City,
  ProductGroups,
  ProductType,
  Zone,
} from "../actions/catalog-data";
import { createNewOrder, Order, updateOrder } from "../actions/orders";
import { useRouter } from "next/navigation";

export function NewOrder({
  productGroups,
  zones,
  order,
  orderId,
}: {
  productGroups: ProductGroups[];
  zones: Zone[];
  order?: Order;
  orderId?: string;
}) {
  const initialProductGroups = productGroups.find((productGroup) =>
    productGroup.productTypes.some(
      (productType) => productType.id == order?.productTypeId
    )
  );
  const [selectedGroup, setSelectedGroup] = useState<ProductGroups | null>(
    initialProductGroups || null
  );
  const initialProductType = productGroups
    .flatMap((productGroup) => productGroup.productTypes)
    .find((productType) => productType.id == order?.productTypeId);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    initialProductType || null
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
  const [corporateId, setCorporateId] = useState(
    order?.corporateId.toString() || ""
  );
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
      alert("Product not selected");
      return;
    }
    const regex = /^[0-9]{8,9}$/;
    if (!corporateId || !regex.test(corporateId.trim())) {
      alert("מספר ח.פ/עוסק מורשה לא תקין, צריך ליהיות באורך 8 עד 9 ספרות");
      return;
    }
    if (!customerName || !customerName.trim()) {
      alert("שם לקוח ריק");
      return;
    }
    if (discount > 100 || discount < 0) {
      alert("הנחה לא תקינה, צריכה ליהיות בין 0 ל 100.");
      return;
    }
    if (price < 0) {
      alert("מכיר לא תקין, צריך ליהיות גדול מ- 0.");
      return;
    }
    setIsLoading(true);
    const orderToPersist = {
      cityId: selectedCity.id,
      corporateId: Number(corporateId.trim()),
      customerName: customerName.trim(),
      date: order?.date || new Date(),
      discount,
      price,
      productTypeId: selectedProduct.id,
    };
    let promise: Promise<unknown>;
    if (order && orderId) {
      promise = updateOrder(orderToPersist, orderId);
    } else {
      promise = createNewOrder(orderToPersist);
    }
    promise.then(() => router.push("/")).finally(() => setIsLoading(false));
  };

  return (
    <div className="flex justify-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 text-right">
          בחר מחלקת מוצר
        </label>
        <select
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right"
          onChange={handleGroupChange}
          value={selectedGroup?.id || ""}
        >
          <option value="">מחלקת מוצר</option>
          {productGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          סוג מוצר
        </label>
        <select
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right"
          onChange={handleProductChange}
          value={selectedProduct?.id || ""}
        >
          <option value="">בחר סוג מוצר</option>
          {selectedGroup?.productTypes.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          אזור
        </label>
        <select
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right"
          onChange={handleZoneChange}
          value={selectedZone?.id || ""}
        >
          <option value="">בחר אזור</option>
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          עיר
        </label>
        <select
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right"
          onChange={handleCityChange}
          value={selectedCity?.id || ""}
        >
          <option value="">בחר עיר</option>
          {selectedZone?.cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          שם לקוח
        </label>
        <input
          type="text"
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          מספר ח.פ/עוסק מורשה
        </label>
        <input
          type="text"
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
          value={corporateId}
          onChange={(e) => setCorporateId(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          עלות מוצר
        </label>
        <input
          type="number"
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="Enter price"
        />

        <label className="block text-sm font-medium text-gray-700 text-right pt-5">
          אחוז הנחה
        </label>
        <input
          type="number"
          className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value))}
          placeholder="Enter discount"
        />

        <button
          type="button"
          className="w-48 bg-blue-500 text-white mt-5 py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          שמור
        </button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <p className="text-white text-2xl">Saving...</p>
          </div>
        )}
      </div>
    </div>
  );
}
