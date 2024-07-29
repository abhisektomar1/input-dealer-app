import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/table";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { BASE_URL_APP } from "../../../utils";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../service/AxiosInstance";

function CropsTable() {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate()

  console.log(data);

  useEffect(() => {
    axiosInstance
      .post(`/GetFPOProductDetails`,{
        filter_type:"Crops"
      })
      .then((res) => {
        if(res.data.status === "success"){
            setData(res.data.products);
        } else{
            toast.error("something went wrong!")
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong!");
      });
  }, []);

  const tableProps = {
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,   
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActionsTrue: true,
    enableRowSelection: false,
    showColumnFilters: true,
    showGlobalFilter: true, // Assuming this should also be passed as a prop
  };
  const editClick = (e: React.MouseEvent, row: any) =>{
    console.log(row);
       navigate(`/dashboard/ProductEdit/${row.product_id}`)
  }
  const columns = useMemo(
    () => [
      {
        id: "data",
        columns: [
          {
            accessorKey: "productName",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Product Name",
          },
          {
            accessorKey: "Category",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Category ",
          },
          {
            accessorKey: "measurement_type",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Measurement Type",
          },
          {
            accessorKey: "selling_price",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Selling Price",
          },
        ],
      },
    ],
    [],
  );
  return (
    <div className="tableDatadiv px-3 py-2">
      <Table {...tableProps} columns={columns} data={data} isEdit={true}
          editClick={editClick}></Table>
    </div>
  );
}

export default CropsTable;
