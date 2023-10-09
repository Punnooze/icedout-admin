"use client";
import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

let rows = [
  {
    id: 1,
    SKU: "5678",
    PNAME: "tshirt1",
    SLUG: "bruh",
    DROP: "1/2/2024",
    PRICE: "1900",
    SIZE: "L",
    STOCK: "YES",
    DISCOUNT: "100",
    DETAILS: "awesome tshirt v beautiful",
    DESCRIPTION: "made from cotton",
    IMAGE: "insert tay face",
    ISFEATURE: "yes",
    FEATURED: "sax",
  },
];

const columns = [
  { field: "SKU", headerName: "SKU", width: 150 },
  { field: "PNAME", headerName: "Product Name", width: 200 },
  { field: "SLUG", headerName: "Slug", width: 150 },
  { field: "DROP", headerName: "Drop", width: 150 },
  { field: "PRICE", headerName: "Price", width: 150 },
  { field: "SIZE", headerName: "Size", width: 150 },
  { field: "STOCK", headerName: "Stock", width: 150 },
  { field: "DISCOUNT", headerName: "Discount", width: 150 },
  { field: "DETAILS", headerName: "Details", width: 150 },
  { field: "DESCRIPTION", headerName: "Description", width: 150 },
  { field: "IMAGE", headerName: "Image", width: 150 },
  { field: "ISFEATURE", headerName: "Is Feature", width: 150 },
  { field: "FEATURED", headerName: "Featured", width: 150 },
  // Add more columns
];

function ProductTable({ data }) {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredRows = rows.filter((row) => {
    return (
      (!filterStatus || row.status === filterStatus) &&
      (!filterColumn ||
        String(row[filterColumn])
          .toLowerCase()
          .includes(searchText.toLowerCase()))
    );
  });

  return (
    <div className="tw-flex tw-flex-col tw-h-screen tw-ml-[70px] tw-w-[100%] tw-bg-background tw-justify-center tw-items-center tw-align-middle">
        <h1 className="tw-col-span-1 tw-text-white">PRODUCT TABLE</h1>
          <button
            onClick={() => router.push("/productinput")}
            className="tw-btn tw-bg-bluepurple tw-rounded"
          >
            Add Product 
          </button>
      <div className="tw-w-[85%]">
        <div style={{ height: 500 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            className="tw-border tw-rounded tw-shadow-md tw-bg-grey"
            getCellClassName={(params) => {
              return `custom-cell ${params.field}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
