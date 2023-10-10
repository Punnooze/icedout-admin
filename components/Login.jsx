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
// import NoLayout from './Nolayout';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#bb86fc',
        light: '#383d82', // Color for GridToolbar icons
      },
      secondary: {
        main: '#363535', // Background color for column header
      },
    },
  });

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

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
      {/* <NoLayout> */}
      <div className="tw-flex tw-justify-center tw-items-center tw-bg-background tw-h-[100vh] tw-w-[100vw] tw-inset-0 ">
        <div
          className="tw-bg-darkgrey tw-rounded-md tw-flex tw-items-center tw-flex-col  tw-p-[30px] tw-shadow-md tw-hover:shadow-lg tw-duration-300 
    
            tw-inset-[-50%] tw-md:inset-0 "
        >
          <h1 className="tw-text-teal tw-font-lato">Login</h1>
          <form
            className=" tw-mt-[10px] tw-flex tw-flex-col  tw-items-center "
            onSubmit={handleSubmit}
          >
            <ThemeProvider theme={theme}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                className="tw-shadow-sm tw-hover:shadow-md tw-text-lightgrey tw-mt-[20px]"
                onChange={(e) => setName(e.target.value)}
                sx={{
                  input: {
                    color: '#b7b8ba',
                  },
                }}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="tw-my-[20px]"
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  input: {
                    color: '#b7b8ba',
                  },
                }}
              />
            </ThemeProvider>
            {/* </FormControl> */}

            <button className=" tw-bg-lightgrey tw-text-darkgrey hover:tw-text-white tw-w-[100px] tw-text-[#ffff] tw-rounded-md tw-h-[30px] hover:tw-bg-violet tw-hover:shadow-sm ">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* </NoLayout> */}
    </>
  );
}

export default Login;
