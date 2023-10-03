'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Chip,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import logo from '../public/logo.png';
import { signOut } from 'next-auth/react';

function Sidebar() {
  useEffect(() => {}, []);

  return (
    <Card className="w-[270px] h-[100vh] bg-lightgrey p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2">
        <Typography variant="h2-xl" color="blue-gray">
          Admin Dashboard
          <Image src={logo} alt="logo" width={200} height={100} />
        </Typography>
        {/* =======
import React, { useState } from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBars,
  faBullhorn,
  faGauge,
  faHandshakeAngle,
  faShirt,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const router = useRouter();
  const [click, setClick] = useState(false);
  return (
    <>
      <div
        className={`${
          click ? 'w-[70px]' : 'w-[200px]'
        } h-[100vh] bg-banner flex flex-col items-center align-middle `}
      >
        <div className="flex justify-end w-[100%]">
          <button
            onClick={() => setClick(!click)}
            className="p-[15px] pb-[5px] text-[20px]"
          >
            {click ? (
              <p>
                <FontAwesomeIcon icon={faBars} />
              </p>
            ) : (
              <p>
                <FontAwesomeIcon icon={faX} />
              </p>
            )}
          </button>
        </div>
        <div
          id="top"
          className={`${
            click ? 'hidden' : 'visible'
          } flex flex-col  justify-center w-[70%] items-center align-middle `}
        >
          <Image src={logo} alt="logo" />
        </div>

        <div
          id="pages"
          className="mt-[30px] flex flex-col items-center w-[100%] "
        >
          <div className=" w-[90%] flex justify-center hover:bg-lightblue hover:shadow-md duration-300 mb-[20px] pt-[5px] pb-[5px] rounded-md ">
            <button
              onClick={() => router.push('/dashboard')}
              className={`flex ${
                click ? 'justify-center' : 'justify-between'
              } items-center w-[70%]`}
            >
              <FontAwesomeIcon className="text-[20px]" icon={faGauge} />
              <h2 className={`${click ? 'hidden' : 'visible'} text-[22px]`}>Dashboard</h2>
            </button>
          </div>

          <div className=" w-[90%] flex justify-center hover:bg-lightblue hover:shadow-md duration-300 mb-[20px] pt-[5px] pb-[5px] rounded-md ">
            <button
              onClick={() => router.push('/order')}
              className={`flex ${
                click ? 'justify-center' : 'justify-between'
              } items-center w-[70%]`}
            >
              <FontAwesomeIcon className="text-[20px]" icon={faBagShopping} />
              <h2 className={`${click ? 'hidden' : 'visible'} text-[22px]`}>Orders</h2>
            </button>
          </div>

          <div className=" w-[90%] flex justify-center hover:bg-lightblue hover:shadow-md duration-300 mb-[20px] pt-[5px] pb-[5px] rounded-md ">
            <button
              onClick={() => router.push('/customers')}
              className={`flex ${
                click ? 'justify-center' : 'justify-between'
              } items-center w-[70%]`}
            >
              <FontAwesomeIcon className="text-[20px]" icon={faUser} />
              <h2 className={`${click ? 'hidden' : 'visible'} text-[22px]`}>Customer</h2>
            </button>
          </div>

          <div className=" w-[90%] flex justify-center hover:bg-lightblue hover:shadow-md duration-300 mb-[20px] pt-[5px] pb-[5px] rounded-md ">
            <button
              onClick={() => router.push('/products')}
              className={`flex ${
                click ? 'justify-center' : 'justify-between'
              } items-center w-[70%]`}
            >
              <FontAwesomeIcon className="text-[20px]" icon={faShirt} />
              <h2 className={`${click ? 'hidden' : 'visible'} text-[22px]`}>Products</h2>
            </button>
          </div>

          <div className=" w-[90%] flex justify-center hover:bg-lightblue hover:shadow-md duration-300 mb-[20px] pt-[5px] pb-[5px] rounded-md ">
            <button
              onClick={() => router.push('/support')}
              className={`flex ${
                click ? 'justify-center' : 'justify-between'
              } items-center w-[70%]`}
            >
              <FontAwesomeIcon
                className="text-[20px]"
                icon={faHandshakeAngle}
              />
              <h2 className={`${click ? 'hidden' : 'visible'} text-[22px]`}>Support</h2>
            </button>
          </div>

          <div className=" w-[90%] flex justify-center hover:bg-lightblue hover:shadow-md duration-300 mb-[20px] pt-[5px] pb-[5px] rounded-md ">
            <button
              onClick={() => router.push('/marketing')}
              className={`flex ${
                click ? 'justify-center' : 'justify-between'
              } items-center w-[70%]`}
            >
              <FontAwesomeIcon className="text-[20px]" icon={faBullhorn} />
              <h2 className={`${click ? 'hidden' : 'visible'} text-[22px]`}>Marketing</h2>
            </button>
          </div>
        </div>
>>>>>>> f8d6167bfaf5fad7023b1da83f0d9ed1c2f81b20 */}
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
