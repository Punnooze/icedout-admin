"use client";
import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import DashboardCard from './DashboardCard';

const products = [
    {
        id: "1",
        name: "Greek tshirt",
        pname: "Angelica drop",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Travis tshirt",
        pname: "Pop Drop",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Weeknd tshirt",
        pname: "Pop Drop",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Lil Nas tshirt",
        pname: "Pop Drop",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];

const ProductStock = () => {
    return (
        <div class="pr-3">
        <DashboardCard title="Product Stock">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, height:'325px'}}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Sr. No.
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Product
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Drop
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Stock Priority
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
        </div>
    );
};

export default ProductStock;
