import React, { useEffect, useMemo, useState } from 'react'
import Table from '../../../components/table'
import axiosInstance from '../../../service/AxiosInstance';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { BASE_URL_APP } from '../../../utils';
import { Navigate, useNavigate } from 'react-router-dom';
import EditAll from './EditAll';

function InputsTable() {

    const navigate = useNavigate()

    
    const [data, setData] = useState<any>([]);
    const [open, setOpen] = useState(false)
    const [id, setID] = useState<any>([])

    useEffect(() => {
        axiosInstance
          .post(`/GetThirdPartySupplier_AllProducts`,)
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

      const editClick = (e: React.MouseEvent, row: any) =>{
        console.log(row);
           navigate(`/dashboard/ProductEdit/${row.product_id}`)
      }


  const tableProps = {
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,   
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActionsTrue: true,
    enableRowSelection: true,
    showColumnFilters: true,
    showGlobalFilter: true, // Assuming this should also be passed as a prop
  };
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
            accessorKey: "purchase_price",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Purchase Price",
          },
          {
            accessorKey: "final_price",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Final Price",
          },
        ],
      },
    ],
    [],
  );

  const selectedRowAction = (table:any) =>{
    setOpen(true)
    const arr:any =[];
    table.getSelectedRowModel().flatRows.map((row:any) => {
      console.log(row.original,"row");
      arr.push(row.original.product_id)
    });
      setID(arr)
  }
  return (
    <div className="tableDatadiv px-3 py-2">
        <Table
          {...tableProps}
          columns={columns}
          data={data}
          isEdit={true}
          editClick={editClick}
          selectedRowAction={selectedRowAction}
        ></Table>
 <EditAll open={open} setOpen={setOpen} id={id} />
        </div>
  )
}

export default InputsTable