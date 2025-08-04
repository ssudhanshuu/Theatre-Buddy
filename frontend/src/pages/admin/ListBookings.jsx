import React from 'react';
import AdminSidebar from './AdminSidebar';

export default function ListBookings() {
  return (
    <div className=" flex h-screen">
      <AdminSidebar />
      <div className="p-4 ml-20 w-[100%] ">List Bookings</div>
    </div>
  );
}
