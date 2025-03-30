import * as React from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-white shadow-md p-4 flex justify-between items-center md:px-8'>
      <h1 className='font-bold text-2xl text-gray cursor-pointer'>Lost & Found</h1>
      
      <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      
      <nav className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex md:items-center md:space-x-10 p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
    isOpen ? 'block' : 'hidden'
  }`}>
        <ul className='flex flex-col md:flex-row md:gap-10 text-gray'>
          <li className='header-item'>Home</li>
          <li className='header-item'>Lost items</li>
          <li className='header-item'>Found items</li>
        </ul>
      </nav>
      
      <div className='hidden md:flex gap-2.5'>
        <button className='header-btn-signin'>Sign In</button>
        <button className='header-btn-signup'>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
