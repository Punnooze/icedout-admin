import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchBar from "./SearchBar";
import Select from "./Select";
import { TrashIcon } from "@heroicons/react/24/solid";

function CustomersCard({ data }) {
  const [searchText, setSearchText] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [filteredRows, setFilteredRows] = useState("");
  const [rows, setRows] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [click, setClick] = useState(true);
  const [dlt, setDlt] = useState(false);

  let count = 0;
  useEffect(() => {
    if (Array.isArray(data)) {
      const value = data.map((item) => {
        count++;
        return {
          ...item,
          id: count,
        };
      });
      setRows(value);
    }
  }, [data, count]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    { field: "email", headerName: "email", width: 200 },
    { field: "whatsapp", headerName: "Mobile Number", width: 200 },
  ];

  useEffect(() => {
    if (Array.isArray(rows)) {
      const filteredRows = rows.filter((row) => {
        return (
          !filterColumn ||
          String(row[filterColumn])
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });
      if (filteredRows) setFilteredRows(filteredRows);
    }
  }, [rows, filterColumn, searchText]);

  return (
    <>
      <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-overflow-y-auto tw-flex tw-flex-col">
        <h1 className="tw-pl-6 tw-text-white">CUSTOMER INFORMATION</h1>
        <div className="tw-flex tw-justify-center tw-items-center tw-h-[100vh]  tw-w-[100%]">
          <div className=" tw-w-[95%] tw-h-[95%] tw-bg-darkergrey tw-rounded-md tw-shadow-md ">
            <div className="tw-grid tw-grid-cols-2 tw-gap-[20px] tw-p-[10px]">
              <div className="tw-w-[200px]">
                <p>Filter by:</p>
                <Select
                  options={["", "id", "name", "email", "whatsapp"]}
                  value={filterColumn}
                  onChange={(value) => setFilterColumn(value)}
                />
              </div>

              <SearchBar
                value={searchText}
                onChange={(value) => setSearchText(value)}
                placeholder={`Search`}
              />
            </div>
            {selectedRow && click && (
              <button onClick={() => setDlt(!dlt)}>
                <TrashIcon
                  className="tw-w-5 tw-h-6"
                  style={{ width: "40px", height: "40px" }}
                />
              </button>
            )}

            {dlt && (
              <div className="tw-pt-5  tw-border tw-rounded tw-shadow-md tw-absolute tw-z-30 tw-bg-background tw-text-center tw-text-white tw-inset-[40%] tw-w-[300px] tw-h-[300px]">
                <h2>Delete details of </h2>
                <br />
                <h2>{selectedRow.name}</h2>
                <br />
                <h2>Click Icon to Confirm</h2>
                <br />
                <button>
                  <TrashIcon
                    className="tw-w-5 tw-h-5"
                    style={{ width: "40px", height: "40px" }}
                  />
                </button>
              </div>
            )}

            <div
              className="tw-flex tw-justify-center tw-items-center tw-mt-[10px]"
              // onClick={() => setSelectedRow(null)}
            >
              <div style={{ height: 500, width: "90%" }}>
                {filteredRows ? (
                  <DataGrid
                    sx={{
                      boxShadow: 2,
                      border: 2,
                      backgroundColor: "#363535",
                      borderRadius: 2,
                      borderColor: "primary.light",
                      "& .MuiDataGrid-cell": {
                        border: 1,
                        borderColor: "primary.main",
                      },
                      "& .MuiDataGrid-cell:hover": {
                        color: "primary.main",
                      },
                    }}
                    rows={filteredRows}
                    columns={columns}
                    onRowClick={(e) => {
                      if (selectedRow === e.row) {
                        setClick(!click);
                      } else {
                        setSelectedRow(e.row);
                        setClick(true);
                        // Set the selected row
                      }
                    }}
                    className="tw-border tw-rounded tw-shadow-md "
                  />
                ) : (
                  <div>Loading..</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersCard;
