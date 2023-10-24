'use client';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from './DashboardCard';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const products = [
  {
    id: '1',
    name: 'Greek tshirt',
    pname: 'Angelica drop',
    priority: 'Low',
    pbg: 'primary.main',
    budget: '3.9',
  },
  {
    id: '2',
    name: 'Travis tshirt',
    pname: 'Pop Drop',
    priority: 'Medium',
    pbg: 'secondary.main',
    budget: '24.5',
  },
  {
    id: '3',
    name: 'Weeknd tshirt',
    pname: 'Pop Drop',
    priority: 'High',
    pbg: 'error.main',
    budget: '12.8',
  },
  {
    id: '4',
    name: 'Lil Nas tshirt',
    pname: 'Pop Drop',
    priority: 'Critical',
    pbg: 'success.main',
    budget: '2.4',
  },
];

const ProductStock = ({ latest }) => {
  const theme = useTheme();
  const [order, setOrder] = useState('');
  const [tagBg, setTagBg] = useState('#707070');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (latest) {
      const updatedLatest = latest.map((prod) => {
        let bg = '';
        switch (prod.status) {
          case 'Confirmed':
            bg = '#03dac6';
            break;
          case 'Shipped':
            bg = '#3549b0';
            break;
          case 'Out for delivery':
            bg = '#e0cc10';
            break;
          case 'Delivered':
            bg = '#45b035';
            break;
          case 'Failed':
            bg = '#c21922';
            break;
          default:
            bg = '#707070';
            break;
        }
        prod.bgColour = bg;
        return prod;
      });
      console.log('latest colour', updatedLatest);
      setData(updatedLatest);
    }
  }, [latest]);

  // Check if theme.palette exists before accessing the mode property
  const isDarkMode = theme.palette && theme.palette.mode === 'dark';
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div class="tw-pr-3 tw-relative">
          <button className="tw-absolute tw-top-8 md:tw-top-4 tw-right-5 tw-flex tw-p-[5px] md:tw-p-[10px] tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px] ">
            <ShoppingBagIcon className="tw-w-5 tw-h-5 tw-mr-[5px] " />
            <p className="tw-flex">
              Orders{' '}
              <span className="tw-mr-[5px] tw-hidden md:tw-block">Page</span>
            </p>
          </button>
          <DashboardCard title="Latest Orders">
            <Box
              sx={{
                overflow: 'auto',
                width: { xs: '280px', sm: 'auto' },
                height: '325px',
              }}
            >
              <Table
                aria-label="simple table"
                sx={{ whiteSpace: 'nowrap', mt: 2 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={1000}>
                        Sr. No.
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={1000}>
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={1000}>
                        Location
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={1000}>
                        Total Price
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={1000}>
                        Payment
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={1000}>
                        Status
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((product, index) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: '15px',
                              fontWeight: '500',
                            }}
                          >
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {product.createdAt.slice(0, 10)}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  fontSize: '13px',
                                }}
                              >
                                {product.post}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {product.shippingAddress.state},
                            {product.shippingAddress.country}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {product.totalPrice}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {product.paymentMethod}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            sx={{
                              px: '4px',
                              backgroundColor: product.bgColour,
                              color: '#fff',
                            }}
                            size="small"
                            label={product.status}
                          ></Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </DashboardCard>
        </div>
      </ThemeProvider>
    </>
  );
};

export default ProductStock;
