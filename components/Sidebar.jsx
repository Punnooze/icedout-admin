import React from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';

function Sidebar() {
  return (
    <>
      <div className="w-[200px] h-[100vh] bg-banner">
        <div id="top" className="flex flex-col">
          <Image src={logo} alt="logo" />

          <p>Icedout</p>
          <button>logout</button>
        </div>
        <div>---median---</div>
        <div id="pages" className="flex flex-col items-center">
          <div>Dashboard</div>
          <div>Orders</div>
          <div>Customer</div>
          <div>Products</div>
          <div>Statistics</div>
          <div>Customer Support</div>
          <div>Marketing</div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
