import React from 'react';
import AdminSidebar from './AdminSidebar';

export default function ListShow() {
  return (
    <div className=" flex h-screen">
      <AdminSidebar />
      <div className="p-4 ml-20 w-[100%] ">List shows</div>
    </div>
  );
}
