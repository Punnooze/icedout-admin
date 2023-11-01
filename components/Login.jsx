'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#bb86fc',
        light: '#383d82',
      },
      secondary: {
        main: '#363535',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert('in');
    try {
      const res = await signIn('credentials', {
        name:name,
        password:password,
        callbackUrl:'/dashboard',
        redirect:true
      });

      if (res.error) {
        alert('Invalid Credentials');
        return false;
      }
      // alert('out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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

            <button
              type="submit"
              className=" tw-bg-lightgrey tw-text-darkgrey hover:tw-text-white tw-w-[100px] tw-text-[#ffff] tw-rounded-md tw-h-[30px] hover:tw-bg-violet tw-hover:shadow-sm "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
