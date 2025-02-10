"use client"
import OrdersTable from '@/components/ui/pageComponents/orders/orders-table'
import StatsCard from '@/components/ui/pageComponents/orders/stats-card'
import Topbar from '@/components/ui/pageComponents/orders/topbar'
import { Order } from '@/constants/orderData';
import { Ban } from 'lucide-react';
import React, { useEffect, useState } from 'react'

type DATA = {
  orders: Order[],
  totalOrders: number,
  completedOrders: number,
  pendingOrders: number,
  totalEarned: number,
  totalPending: number
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<DATA>({
    orders: [],
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalEarned: 0,
    totalPending: 0
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: { "Content-type": "application/json" }
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        
        setData({
          orders: result.orders,
          totalOrders: result.totalOrders,
          completedOrders: result.completedOrders,
          pendingOrders: result.pendingOrders,
          totalEarned: result.totalEarned,
          totalPending: result.totalPending
        });
      } else {
        setError("Error fetching data | try reloading");
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching data | try reloading");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return (
      <div className='items-center flex justify-center h-screen flex-1 flex-col gap-2'>
        <Ban className='text-[#FF334E]' size={60}/>
        <h1 className='text-[#131313]'>{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <Topbar />
      <div className={`w-full grid lg:grid-cols-3 md:grid-cols-2 mt-4 ${loading && 'animate-pulse'}`}>
        <StatsCard value={data.totalOrders} text='Total orders' color='#2F44FF' textColor='#FFF'/>
        <StatsCard value={data.completedOrders} text='Completed Orders' color='#FFF' textColor='#878787' />
        <div className='lg:col-span-1 md:col-span-2'>
        <StatsCard value={data.pendingOrders} text='Pending Orders' color='#FFF' textColor='#878787'/>
        </div>
      </div>
      <div className='grid lg:grid-cols-2'>
        <StatsCard value={data.totalEarned} text='Total Earning' color='#FFF' textColor='#878787' />
        <StatsCard value={data.totalPending} text='Pending Amount' color='#FFF' textColor='#878787' />
      </div>
      <OrdersTable orders={data.orders} loading={loading} />
    </div>
  );
}

export default Page;
