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
        click ? 'tw-w-[70px]' : 'tw-w-[180px]'
      } tw-h-[100vh] tw-absolute tw-bg-darkgrey tw-p-2 tw-shadow-xl tw-shadow-blue-gray-900/5 tw-z-30 tw-overflow-y-auto`}
    >
      <div className=" tw-mb-2">
        <div className="tw-w-[100%]  tw-flex tw-justify-end">
          <button onClick={() => setClick(!click)}>
            {click ? (
              <ChevronRightIcon className="tw-stroke-[2px] tw-stroke-bluepurple tw-w-5 tw-h-5" />
            ) : (
              <ChevronLeftIcon className="tw-stroke-[2px] tw-stroke-bluepurple tw-w-5 tw-h-5" />
            )}
          </button>
        </div>

        <Typography
          variant="h2"
          className={`tw-lg:text-[18px] ${click ? 'tw-invisible' : 'tw-visible'} `}
          color="blue-gray"
        >
          <Image src={logo} alt="logo" width={200} height={100} />
        </Typography>
      </div>

      <List className=" tw-w-[100%] ">
        <ListItem
          onClick={() => router.push('/dashboard')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <PresentationChartBarIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} 
              ${pathname === '/dashboard' ? 'tw-text-teal' : 'tw-text-bluepurple'}`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/dashboard' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Dashboard
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/order')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
        
          hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ShoppingBagIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/order' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/order' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Orders
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/customers')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <UserCircleIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/customers' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/customers' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Customers
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/products')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <Cog6ToothIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/products' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/products' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Products
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/support')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <UserGroupIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/support' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/support' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Support
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/marketing')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/marketing' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/marketing' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Marketing
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/banners')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/banners' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/banners' ? 'tw-text-teal' : 'tw-text-bluepurple'
            }`}
            color="blue-gray"
          >
            Banners
          </Typography>
        </ListItem>
        <br />
        <ListItem
          onClick={() => router.push('/coupons')}
          className={` tw-flex ${
            click ? 'tw-justify-center' : 'tw-justify-between'
          }  tw-items-center tw-align-middle  hover:tw-bg-darkergrey
           hover:tw-shadow-sm tw-duration-200 tw-rounded-md 
           ${click ? 'tw-p-[10px]' : 'tw-p-[5px]'} 
           `}
        >
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon
              className={`${click ? 'tw-h-6' : 'tw-h-5'} ${click ? 'tw-w-6' : 'tw-w-5'} ${
                pathname === '/coupons' ? 'tw-text-teal' : 'tw-text-bluepurple'
              }`}
            />
          </ListItemPrefix>
          <Typography
            variant="h2"
            className={`tw-text-[18px] ${click ? 'tw-hidden' : 'tw-visible'} ${
              pathname === '/coupons' ? 'tw-text-teal' : 'tw-text-bluepurple'
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
        <ListItem className=" hover:tw-bg-darkergrey hover:tw-shadow-sm tw-duration-200 tw-rounded-md tw-p-[5px] tw-px-[10px] tw-flex tw-justify-center tw-items-center tw-align-middle tw-mt-[20px] ">
          <button
            onClick={signOut}
            className=" tw-p-[10px] tw-rounded-md tw-flex tw-justify-center tw-items-center tw-align-middle "
          >
            <PowerIcon
              className={`tw-h-6 tw-w-6 ${
                click ? 'tw-visible' : 'tw-hidden'
              } tw-stroke-bluepurple tw-text-bluepurple `}
            />
            <Typography
              variant="h2"
              className={`tw-text-[18px] ${
                click ? 'tw-hidden' : 'tw-visible'
              } tw-text-bluepurple`}
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
