import { Order } from '@/constants/orderData';
import React from 'react';

type Props = {
    orders?: Order[];
    loading: boolean;
};

const OrdersTable: React.FC<Props> = ({ orders, loading }) => {
    return (
        <div className="border-[1px] w-full overflow-x-auto rounded-lg drop-shadow-sm">
            <table className="w-full min-w-max bg-[#FCFCFC] border-collapse">
                <thead>
                    <tr className="text-left font-normal text-[#5C5C5C] text-sm md:text-base">
                        <th className="px-4 py-2 font-normal">Order #</th>
                        <th className="px-4 py-2 font-normal">Customer</th>
                        <th className="px-4 py-2 font-normal">Items</th>
                        <th className="px-4 py-2 font-normal">Area</th>
                        <th className="px-4 py-2 font-normal">Total Amount</th>
                        <th className="px-4 py-2 font-normal">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                Loading...
                            </td>
                        </tr>
                    ) : orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr
                                key={index}
                                className="text-left text-[#3F4369] cursor-pointer hover:bg-[#FFF] text-sm md:text-base"
                            >
                                <td className="px-4 py-4">{order.orderNumber}</td>
                                <td className="px-4 py-4">{order.customer.name}</td>
                                <td className="px-4 py-4 flex flex-wrap gap-2">
                                    {order.items.map((item, idx) => (
                                        <span key={idx} className="bg-gray-200 px-2 py-1 rounded-md text-xs md:text-sm">
                                            {item.name} x {item.quantity}
                                        </span>
                                    ))}
                                </td>
                                <td className="px-4 py-4">{order.area}</td>
                                <td className="px-4 py-4">${order.totalAmount.toFixed(2)}</td>
                                <td className="px-4 py-4">{order.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
