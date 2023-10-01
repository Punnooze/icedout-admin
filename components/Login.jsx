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
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="name"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>
          <button className="bg-navbg p-[5px] text-[#ffff]">Submit</button>
          <Link href={'/register'}>Register</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
