import { getOrders, getOrdersCount } from "../actions/orders";
import Link from "next/link";
import { SearchOrder } from "./search-order";

export const revalidate = 60;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const prevPage = page - 1;
  const nextPage = page + 1;
  const pageSize = 5;
  const [orders, count] = await Promise.all([
    getOrders(pageSize, page),
    getOrdersCount(),
  ]);
  return (
    <div className="container mx-auto p-4">
      <p>סה״כ הזמנות: {count}</p>
      <SearchOrder></SearchOrder>
      <div className="flex flex-col mb-5">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] flex bg-gray-200 p-2 font-bold">
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
          {orders.map((order) => (
            <Link
              href={{
                pathname: `/edit-order/${order.incrementalId}`,
              }}
            >
              <div key={order.id} className="min-w-[1000px] flex p-2 border-b">
                <div className="flex-1">{order.incrementalId}</div>
                <div className="flex-1">{order.date.toLocaleDateString()}</div>
                <div className="flex-1">{order.city.name}</div>
                <div className="flex-1">{order.productType.name}</div>
                <div className="flex-1">{order.customerName}</div>
                <div className="flex-1">{order.corporateId}</div>
                <div className="flex-1">{order.price.toFixed(2)}</div>
                <div className="flex-1">{order.discount.toFixed(2)}</div>
                <div className="flex-1">
                  {order.price
                    .times(
                      order.discount
                        .times(1 / 100)
                        .minus(1)
                        .times(-1)
                    )
                    .toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Link
        href={{
          pathname: "/search-order",
          query: { ...searchParams, page: prevPage },
        }}
      >
        <button
          disabled={prevPage < 1}
          className={`mr-2 p-2 rounded bg-blue-500 text-white ${
            !prevPage ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          דף קודם
        </button>
      </Link>
      <Link
        href={{
          pathname: "/search-order",
          query: { ...searchParams, page: nextPage },
        }}
      >
        <button
          disabled={page > count / pageSize}
          className={`mr-2 p-2 rounded bg-blue-500 text-white ${
            page > count / pageSize
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          דף הבא
        </button>
      </Link>
    </div>
  );
}
