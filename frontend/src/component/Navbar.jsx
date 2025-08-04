import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser()
  const { openSignIn } = useClerk()
const navigate = useNavigate()

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 lg:px-36 py-5 bg-[#111115]">

        <Link to="/" className="max-md:flex-1">
          <h1 className="text-2xl font-bold text-white">THEATRE BUDDY</h1>
        </Link>

        {/* Navigation Links (toggle on mobile) */}
        <div
          className={`max-md:absolute max-md:left-0 max-md:top-[70px] z-40 flex flex-col md:flex-row items-center
        max-md:rounded-md backdrop-blur bg-black/70 md:bg-white/10 md:border-dashed border-gray-300/20 border
        rounded-full overflow-hidden transition-all duration-300 px-6 py-4 md:py-0 md:px-0 
        ${isOpen ? 'max-md:w-full max-md:opacity-100' : 'max-md:w-0 max-md:opacity-0'}`}
        >
          {/* Close Icon for Mobile */}
          <XIcon
            className="md:hidden absolute top-4 right-4 w-6 h-6 text-white"
            onClick={() => setIsOpen(false)}
          />

          <Link to="/" className="text-white px-4 py-2 hover:text-primary">Home</Link>
          <Link to="/movies" className="text-white px-4 py-2 hover:text-primary">Movies</Link>
          <Link to="/theaters" className="text-white px-4 py-2 hover:text-primary">Theaters</Link>
          <Link to="/releases" className="text-white px-4 py-2 hover:text-primary">Releases</Link>
          <Link to="/favorites" className="text-white px-4 py-2 hover:text-primary">Favorites</Link>
         <Link to="/" className="text-white px-4 py-2 hover:text-primary">ContectUs</Link>
     
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          <SearchIcon className="max-md:hidden w-6 h-6 text-white cursor-pointer" />
          {
            !user ? (
              <button onClick={openSignIn} className="px-4 py-2 bg-primary hover:bg-primary-dull transition rounded-full border 
        font-medium text-white cursor-pointer">
                Login
              </button>) : (
              <UserButton > 
                <UserButton.MenuItems>
               <UserButton.Action label='My Bookings' labelIcon = 
               {<TicketPlus width={15}/>}  onClick={()=>navigate('/mybooking')}/>


                </UserButton.MenuItems>
                  </UserButton>
            )

          }


        </div>

        {/* Menu Toggle Button for Mobile */}
        <MenuIcon
          className="max-md:ml-4 md:hidden w-8 h-8 text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
         
      </div>
    </>

  );
}

export default Navbar;
