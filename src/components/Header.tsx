import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <h1 className='font-bold text-2xl text-gray'>Lost & Found</h1>
        <div>
            <ul className='flex flex-row gap-10'>
                <li className='header-item'>Home</li>
                <li className='header-item'>Lost items</li>
                <li className='header-item'>Found items</li>
            </ul>
        </div>
        <ul className='gap-2.5 flex flex-row'>
            <li><button className='header-btn-signin'>Sign In</button></li>
            <li><button className='header-btn-signup'>Sign Up</button></li>
        </ul>
    </div>
  )
}

export default Header