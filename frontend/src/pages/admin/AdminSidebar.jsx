import React from 'react';
import { assets } from '../../assets/assets';
<<<<<<< HEAD
import {
  Layout,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react';
=======
import { Layout, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react';
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
import { NavLink, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const user = {
<<<<<<< HEAD
    firstName: 'Admin',
    lastName: 'User',
=======
    firstName: "Admin",
    lastName: "User",
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
<<<<<<< HEAD
    { name: 'Dashboard', path: '/api/admin/dashboard', icon: Layout },
    { name: 'Add Show', path: '/api/admin/shows/add', icon: PlusSquareIcon },
    { name: 'List Show', path: '/api/admin/shows', icon: ListIcon },
    { name: 'List Bookings', path: '/api/admin/bookings', icon: ListCollapseIcon },
    { name: 'Theaters', path: '/api/admin/add-theaters', icon: ListCollapseIcon },
    { name: 'Add Movies', path: '/api/admin/movies/add', icon: ListCollapseIcon },
    { name: 'List Upcoming Movies', path: '/api/admin/movies/upcoming', icon: ListCollapseIcon },
=======
    { name: 'Dashboard', path: '/admin/dashboard', icon: Layout },
    { name: 'Add Shows', path: '/admin/add-show', icon: PlusSquareIcon },
   { name: 'List Shows', path: '/admin/list-show', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
  ];

  const location = useLocation();

  return (
<<<<<<< HEAD
    <div className="h-screen w-50 max-sm:w-40 bg-white shadow-md flex flex-col pt-6 fixed">
      {/* Profile */}
      <div className="flex flex-col items-center px-4">
        <img
          src={user.imageUrl}
          alt="Admin"
          className="h-14 w-14 rounded-full"
        />
        <p className="mt-2 font-medium">{user.firstName} {user.lastName}</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col gap-2 px-4">
        {adminNavlinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 py-2 px-3 rounded-md transition-all duration-200
                ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
=======
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
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
    </div>
  );
}
