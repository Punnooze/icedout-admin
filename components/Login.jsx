'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import NoLayout from './Nolayout';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      <NoLayout>
        <div className="flex justify-center items-center bg-background h-[100vh] w-[100vw] inset-0 ">
          <div
            className="bg-darkgrey rounded-md flex items-center flex-col  p-[30px] shadow-md hover:shadow-lg duration-300 
    
        inset-[-50%] md:inset-0 "
          >
            <h1 className="text-white font-lato">Login</h1>
            <form
              className=" mt-[10px] flex flex-col  items-center "
              onSubmit={handleSubmit}
            >
              {/* <div className="flex flex-col mb-[20px]">
              <label className="text-[12px] font-medium text-lightgrey font-poppins">
                Name
              </label>
              <input
                className="rounded-sm hover:shadow-md shadow-sm  outline-none md:w-[250px] h-[30px] p-[5px] focus:border-[2px] border-violet"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div> */}
              {/* <div className="flex flex-col mb-[20px]">
              <label className="text-[12px] font-medium text-lightgrey">
                Password
              </label>
              <input
                className="rounded-sm hover:shadow-md shadow-sm  outline-none md:w-[250px] h-[30px] p-[5px] focus:border-[2px] border-violet"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div> */}
              {/* <FormControl
              sx={{ m: 1, width: '25ch' }}
              variant="outlined"
              onSubmit={handleSubmit}
              className=""
            > */}
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                className="shadow-sm hover:shadow-md mt-[20px]"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="my-[20px]"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* </FormControl> */}

              <button className=" bg-lightgrey text-darkgrey hover:text-white w-[100px] text-[#ffff] rounded-md h-[30px] hover:bg-violet hover:shadow-sm ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </NoLayout>
    </>
  );
}

export default Login;
