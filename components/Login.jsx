'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  //   const toastOptions = {
  //     position: 'bottom-right',
  //     autoClose: 5000,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: 'dark',
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        name,
        password,
        redirect: false,
      });

      if (res.error) {
        alert('Invalid Credentials');
        return false;
      }
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] w-[100vw] inset-0">
        <div
          className="bg-lightgrey rounded-md flex items-center flex-col  p-[30px] shadow-md hover:shadow-lg duration-300 
    
        inset-[-50%] md:inset-0 "
        >
          <h1>Login</h1>
          <form
            className=" mt-[10px] flex flex-col  items-center "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-[20px]">
              <label className="text-[12px] font-medium ">Name</label>
              <input
                className="rounded-sm hover:shadow-sm md:w-[250px] h-[30px] p-[5px]"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col mb-[20px]">
              <label className="text-[12px] font-medium ">Password</label>
              <input
                className="rounded-sm hover:shadow-sm  md:w-[250px] h-[30px] p-[5px]"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <button className=" bg-navbg w-[100px] text-[#ffff] rounded-md h-[30px] hover:bg-darkblue ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
