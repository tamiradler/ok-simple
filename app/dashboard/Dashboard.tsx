"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  CartesianGrid,
} from "recharts";
import { ReactElement } from "react";

function DashboardItem({
  children,
  title,
}: {
  children: ReactElement;
  title: string;
}) {
  return (
    <div className="w-full">
      <h3 className="text-center font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

const TotalPriceByCityTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded text-right">
        <p className="label">{`עיר: ${payload[0].payload.city}`}</p>
        <p className="totalPrice">{`סכום: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function TotalPriceByCity({
  data,
}: {
  data: { totalPrice: number | undefined }[];
}) {
  return (
    <DashboardItem title="סה״כ מחיר לפי עיר">
      <BarChart
        title="sdf"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip content={<TotalPriceByCityTooltip />} />
        <Bar
          dataKey="totalPrice"
          fill="#B3CDAD"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </DashboardItem>
  );
}

const PopularProductGroupsTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    console.log("ddd", payload);

    return (
      <div className="bg-white border border-gray-300 p-2 rounded text-right">
        <p className="label">{`מוצר: ${payload[0].payload.productTypeName}`}</p>
        <p className="totalPrice">{`כמות: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function PopularProductGroups({
  data,
}: {
  data: { productTypeName: string | undefined; count: number }[];
}) {
  return (
    <DashboardItem title="הנמכרים ביותר">
      <BarChart
        title="sdf"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="productTypeName"
          tickFormatter={(value: any, index: number) => {
            const maxLength = 7;
            if (value.length > maxLength) {
              return `${value.slice(0, maxLength).trim()}...`;
            }
            return value;
          }}
        />
        <YAxis />
        <Tooltip content={<PopularProductGroupsTooltip />} />
        <Bar
          dataKey="count"
          fill="#B3CDAD"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </DashboardItem>
  );
}

const PopularCustomerTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded text-right">
        <p className="label">{`עיר: ${payload[0].payload.name}`}</p>
        <p className="totalPrice">{`סכום: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function PopularCustomer({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  return (
    <DashboardItem title="הכי הרבה מזמינים">
      <BarChart
        title="sdf"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickFormatter={(value: any, index: number) => {
            const maxLength = 7;
            if (value.length > maxLength) {
              return `${value.slice(0, maxLength).trim()}...`;
            }
            return value;
          }}
        />
        <YAxis />
        <Tooltip content={<PopularCustomerTooltip />} />
        <Bar
          dataKey="count"
          fill="#B3CDAD"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </DashboardItem>
  );
}
