import React from 'react';
import { assets } from '../../assets/assets';
import {
  Layout,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: 'Dashboard', path: '/api/admin/dashboard', icon: Layout },
    { name: 'Add Show', path: '/api/admin/shows/add', icon: PlusSquareIcon },
    { name: 'List Show', path: '/api/admin/shows', icon: ListIcon },
    { name: 'List Bookings', path: '/api/admin/bookings', icon: ListCollapseIcon },
    { name: 'Theaters', path: '/api/admin/add-theaters', icon: ListCollapseIcon },
    { name: 'Add Movies', path: '/api/admin/movies/add', icon: ListCollapseIcon },
    { name: 'List Upcoming Movies', path: '/api/admin/movies/upcoming', icon: ListCollapseIcon },
  ];

  const location = useLocation();

  return (
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
    </div>
  );
}
