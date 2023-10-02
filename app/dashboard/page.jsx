import React from 'react';
import Dashboard from '@/components/Dashboard';
import Sidebar from '@/components/Sidebar';

function page() {
  return (
    <div className="flex ">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default page;
