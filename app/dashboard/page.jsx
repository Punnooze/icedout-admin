import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Sidebar from '@/components/Sidebar';

function page() {
  return (
    <div className="tw-flex ">
      {/* <Sidebar /> */}
      <DashboardLayout />
    </div>
  );
}

export default page;
