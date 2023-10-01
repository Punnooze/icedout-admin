'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <button onClick={signOut}>Logout</button>
    </>
  );
}

export default Dashboard;
