import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../layout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Table from "../../components/table";
import axiosInstance from "../../service/AxiosInstance";


function PurchaseList() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);

 
  useEffect(() => {
    axiosInstance
      .post(`/GetCustomerRecordSales`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, []);

  const tableProps = {
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActionsTrue: false,
    enableRowSelection: false,
    showColumnFilters: true,
    showGlobalFilter: true, // Assuming this should also be passed as a prop
  };

  const columns = useMemo(
    () => [
      {
        id: "data",
        columns: [
          {
            accessorKey: "name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Name",
          },
          {
            accessorKey: "category",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Category",
          },
          {
            accessorKey: "quantity",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Quantity",
          },
          {
            accessorKey: "total_amount",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Total Amount",
          },
        ],
      },
    ],
    [],
  );


  

  return (
    <Layout>
      <Card className="p-4">
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-xl font-bold">Customer List</h1>
          {/* <Button className="rounded mt-2" onClick={() => {
            navigate("/dashboard/addSale")
          }} >
            Add Sale  
        </Button> */}
        </div>
         
          <div className="tableDatadiv px-3 py-2">
            <Table
              {...tableProps}
              columns={columns}
              data={data}
            ></Table>
          </div>
      </Card>
    </Layout>
  );
}

export default PurchaseList;
