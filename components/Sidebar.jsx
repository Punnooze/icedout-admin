'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Card, Typography, List, ListItem, ListItemPrefix, Chip } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import logo from '../public/logo.png';
import { signOut } from 'next-auth/react';

function Sidebar() {
  useEffect(() => {
  }, []);

  return (
    <Card className="w-[270px] h-[100vh] bg-lightgrey p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2">
        <Typography variant="h2-xl" color="blue-gray">
          Admin Dashboard
          <Image src={logo} alt="logo" width={200} height={100} />
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
          Dashboard
          </Typography>
        </ListItem>
        <br/>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
          Orders
          </Typography>
        </ListItem>
        <br/>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
          Customers
          </Typography>
        </ListItem>
        <br/>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
          Products
          </Typography>
        </ListItem>
        <br/>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
          Customer Support
          </Typography>
        </ListItem>
        <br/>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
          Marketing
          </Typography>
        </ListItem>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <ListItem>
          <button onClick={signOut} className="bg-blue-gray-100 text-blue-gray-500 p-2 rounded-md mt-4">
          <Typography variant="h2-xl" color="blue-gray">
          Logout
          </Typography>
          </button>
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
