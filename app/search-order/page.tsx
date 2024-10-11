import { getOrders } from "../actions/orders";

export const revalidate = 60;

export default async function Page() {
  const orders = await getOrders(5, 1);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="flex bg-gray-200 p-2 font-bold">
          <div className="flex-1">ID</div>
          <div className="flex-1">תאריך</div>
          <div className="flex-1">עיר</div>
          <div className="flex-1">מוצר</div>
          <div className="flex-1">שם לקוח</div>
          <div className="flex-1">עוסק מורשה</div>
          <div className="flex-1">מחיר</div>
          <div className="flex-1">הנחה</div>
          <div className="flex-1">מחיר סופי</div>
        </div>
        {/* Table Rows */}
        {orders.map((order) => (
          <div key={order.id} className="flex p-2 border-b">
            <div className="flex-1">{order.id}</div>
            <div className="flex-1">{order.date.toLocaleDateString()}</div>
            <div className="flex-1">{order.city.name}</div>
            <div className="flex-1">{order.productType.name}</div>
            <div className="flex-1">{order.customerName}</div>
            <div className="flex-1">{order.corporateId}</div>
            <div className="flex-1">{order.price.toFixed(2)}</div>
            <div className="flex-1">{order.discount.toFixed(2)}</div>
            <div className="flex-1">{order.price.times(order.discount.times(1/100).minus(1).times(-1)).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
