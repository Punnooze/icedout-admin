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
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
            Dashboard
          </Typography>
        </ListItem>
        <br />
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
            Orders
          </Typography>
        </ListItem>
        <br />
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
            Customers
          </Typography>
        </ListItem>
        <br />
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
            Products
          </Typography>
        </ListItem>
        <br />
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h2-xl" color="blue-gray">
            Customer Support
          </Typography>
        </ListItem>
        <br />
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
          <button
            onClick={signOut}
            className="bg-blue-gray-100 text-blue-gray-500 p-2 rounded-md mt-4"
          >
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