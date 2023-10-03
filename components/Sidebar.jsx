'use client';
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
      </div>
    </>
  );
}

export default Sidebar;
