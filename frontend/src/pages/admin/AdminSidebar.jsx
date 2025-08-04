import React from 'react';
import { assets } from '../../assets/assets';
import { Layout, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Layout },
    { name: 'Add Shows', path: '/admin/add-show', icon: PlusSquareIcon },
   { name: 'List Shows', path: '/admin/list-show', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ];

  const location = useLocation();

  return (
    <div className="h-[calc(100vh-60px)] fixed md:flex flex-col    pt-8 max-w-19 md:max-w-50 w-full border-rounded-0 bg-gray-500/20 text-sm">
      <img
        className="h-9 md:h-14 w-9 md:w-14 rounded-full ml-5 md:ml-12"
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-2  ml-5 md:ml-12 text-base max:md:hidden">
        {user.firstName} {user.lastName}
      </p>
      <div className="items-center   w-full">
        {adminNavlinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 
              text-gray-400 ${isActive ? 'bg-primary/15 text-primary group' : ''}`
            }
          >
            <link.icon className="w-5 h-5" />
            <p className="max-md:hidden">{link.name}</p>
            <span
              className={`w-1.5 h-10 rounded-1 right-0 absolute ${
                location.pathname === link.path ? 'bg-primary' : ''
              }`}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
