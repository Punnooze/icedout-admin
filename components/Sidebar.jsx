'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid';
import logo from '../public/logo.png';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [click, setClick] = useState(true);

  return (
    <Card
      className={`${
        click ? 'w-[70px]' : 'w-[180px]'
      } h-[100vh] absolute bg-darkgrey p-2 shadow-xl shadow-blue-gray-900/5 z-30`}
    >
      <div className=" mb-2">
        <div className="w-[100%]  flex justify-end">
          <button onClick={() => setClick(!click)}>
            {click ? (
              <ChevronRightIcon className="stroke-[2px] stroke-bluepurple w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="stroke-[2px] stroke-bluepurple w-5 h-5" />
            )}
          </button>
        </div>

        <Typography
          variant="h2"
          className={`lg:text-[18px] ${click ? 'invisible' : 'visible'} `}
          color="blue-gray"
        >
          <Image src={logo} alt="logo" width={200} height={100} />
        </Typography>
      </div>

      <List className=" w-[100%] ">
        <ListItem
          onClick={() => router.push('/dashboard')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <PresentationChartBarIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} 
              ${pathname === '/dashboard' ? 'text-teal' : 'text-bluepurple'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/dashboard' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Dashboard
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/order')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
        
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ShoppingBagIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/order' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/order' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Orders
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/customers')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <UserCircleIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/customers' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/customers' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Customers
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/products')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <Cog6ToothIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/products' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/products' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Products
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/support')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <UserGroupIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/support' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/support' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Support
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/marketing')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/marketing' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/marketing' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Marketing
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/banners')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/banners' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/banners' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Banners
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/coupons')}
          className={` flex ${
            click ? 'justify-center' : 'justify-between'
          }  items-center align-middle  hover:bg-darkergrey
           hover:shadow-sm duration-200 rounded-md 
           ${click ? 'p-[10px]' : 'p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'} ${
                pathname === '/coupons' ? 'text-teal' : 'text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`text-[18px] ${click ? 'hidden' : 'visible'} ${
              pathname === '/coupons' ? 'text-teal' : 'text-bluepurple'
            }`}
            color="blue-gray"
          >
            Coupons
          </Typography>
        </ListItem>
        {/* <br /> */}
        {/* <br />
        <br />
        <br /> */}
        <ListItem className=" hover:bg-darkergrey hover:shadow-sm duration-200 rounded-md p-[5px] px-[10px] flex justify-center items-center align-middle mt-[20px] ">
          <button
            onClick={signOut}
            className=" p-[10px] rounded-md flex justify-center items-center align-middle "
          >
            <PowerIcon
              className={`h-6 w-6 ${
                click ? 'visible' : 'hidden'
              } stroke-bluepurple text-bluepurple `}
            />
            <Typography
              variant="h2"
              className={`text-[18px] ${
                click ? 'hidden' : 'visible'
              } text-bluepurple`}
              color="blue-gray"
            >
              Logout
            </Typography>
          </button>
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
