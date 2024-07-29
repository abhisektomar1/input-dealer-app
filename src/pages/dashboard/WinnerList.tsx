import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import Layout from "../../layout";
import { Card } from "../../components/ui/card";
import Table from "../../components/table";
import { toast } from "react-toastify";
import { BASE_URL_APP } from "../../utils";
import axiosInstance from "../../service/AxiosInstance";

function WinnerList() {
  
    const [data, setData] = useState<any>([]);
    console.log(data);

    useEffect(() => {
        axiosInstance
          .post(`/filterwinners`,{
            filter_type:"State level"
          })
          .then((res) => {
            if(res.data.status === "success"){
                setData(res.data.fpo_users);
            } else{
                toast.error("something went wrong!")
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message)
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
            accessorFn: (row:any) => `${row.fpo_name}`, //accessorFn used to join multiple data into a single cell
            id: 'fpo_name', //id is still required when using accessorFn instead of accessorKey
            header: 'Profile',
            
            Cell: ({ renderedCellValue, row }:any) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  src={`${BASE_URL_APP}/media/${row.original.profile}`}
                  loading="lazy"
                  style={{ borderRadius: '50%', width:"50px" }}
                />
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row:any) => `${row.fpo_name}`, //accessorFn used to join multiple data into a single cell
            id: 'coins', //id is still required when using accessorFn instead of accessorKey
            header: 'Coins',
            
            Cell: ({ renderedCellValue, row }:any) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  src={`${BASE_URL_APP}/media/${row.original.badgecolor}`}
                  loading="lazy"
                  style={{ borderRadius: '50%', width:"50px" }}
                />
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "state",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "State",
          },
        ],
      },
    ],
    []
  );
  return (
    <Layout>
      <Card className="p-8 py-8">
        <h1 className="p-3 text-xl font-bold">Farmer Winners</h1>
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

export default WinnerList;
