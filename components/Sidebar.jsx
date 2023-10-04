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
import { useRouter } from 'next/navigation';

function Sidebar() {
  const router = useRouter();
  const [click, setClick] = useState(false);

  return (
    <Card
      className={`${
        click ? 'w-[90px]' : 'w-[200px]'
      } h-[100vh] sticky bg-lightgrey p-4 shadow-xl shadow-blue-gray-900/5 `}
    >
      <div className="mb-2">
        <button
          onClick={() => setClick(!click)}
          className="w-[100%] flex justify-end"
        >
          {click ? (
            <ChevronRightIcon className="stroke-[2px] stroke-[#000] w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="stroke-[2px] stroke-[#000] w-5 h-5" />
          )}
        </button>

        <Typography
          variant="h2"
          className={`lg:text-[18px] ${click ? 'invisible' : 'visible'} `}
          color="blue-gray"
        >
          <Image src={logo} alt="logo" width={200} height={100} />
        </Typography>
      </div>

      <List className=" w-[100%]">
        <ListItem
          onClick={() => router.push('/dashboard')}
          className=" flex justify-between hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] "
        >
          <ListItemPrefix>
            <PresentationChartBarIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
            color="blue-gray"
          >
            Dashboard
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/order')}
          className=" flex justify-between hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] "
        >
          <ListItemPrefix>
            <ShoppingBagIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
            color="blue-gray"
          >
            Orders
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/customers')}
          className=" flex justify-between hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] "
        >
          <ListItemPrefix>
            <UserCircleIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
            color="blue-gray"
          >
            Customers
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/products')}
          className=" flex justify-between hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] "
        >
          <ListItemPrefix>
            <Cog6ToothIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
            color="blue-gray"
          >
            Products
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/support')}
          className=" flex justify-between hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] "
        >
          <ListItemPrefix>
            <UserGroupIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
            color="blue-gray"
          >
            Support
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/marketing')}
          className=" flex justify-between hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] "
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'h-6' : 'h-5'} ${click ? 'w-6' : 'w-5'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
            color="blue-gray"
          >
            Marketing
          </Typography>
        </ListItem>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ListItem className=" hover:bg-lightgrey hover:shadow-sm duration-200 rounded-md p-[5px] pr-[10px] pl-[10px] flex justify-center items-center align-middle ">
          <button
            onClick={signOut}
            className="bg-blue-gray-100 text-blue-gray-500 p-2 rounded-md mt-4 "
          >
            <PowerIcon
              className={`h-6 w-6 ${
                click ? 'visible' : 'hidden'
              } stroke-darkblue `}
            />
            <Typography
              variant="h2"
              className={`lg:text-[18px] ${click ? 'hidden' : 'visible'} `}
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
