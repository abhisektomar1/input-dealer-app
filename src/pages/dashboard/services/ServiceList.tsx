import React, { useMemo } from "react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import Table from "../../../components/table";

function ServiceList() {

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
  const columns = useMemo(
    () => [
      {
        id: "data",
        columns: [
          {
            accessorFn: (row:any) => `${row.first_name} ${row.last_name}`,
            id: "name",
            header: "Name",

            Cell: ({ renderedCellValue, row }:any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  size: 10,
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorKey: "mobileno",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Contact No.",
          },
          {
            accessorKey: "address",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Address",
          },
          {
            accessorKey: "tahasil",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Tehsil",
          },
          {
            accessorKey: "created_dt",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Created Date",
          },
          {
            accessorKey: "warehouse_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Warehouse Name",
          },
          {
            accessorKey: "profile",
            // enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Supplier’s List",
            size: 100,
            Cell: ({ cell, row }:any) => {
              return (
                <Box className="d-flex flex-wrap g-5 sp-btn-g">
                  <NavLink
                    to={`/organization/supplier-list/${row.original.id}`}
                    className="formbtnnew4"
                  >
                    List
                  </NavLink>
                  {/* <NavLink to={"#"} className="formbtnnew3 ms-2" >Dashboard</NavLink> */}
                </Box>
              );
            },
          },
        ],
      },
    ],

    []
  );
  return (
    <Layout>
      <Card className="p-8 py-8">
        <h1 className="p-3 text-xl font-bold">UserProfile</h1>
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

export default ServiceList;

export const data = [
  {
    id: '9s41r1',
    first_name: 'Dustyq',
    last_name: 'Kuvalis',
    mobileno: '12837492 ',
    warehouse:'Warehouse Name & address',
    address: '12837492 lorem ipsumlorem ipsum lorem',
    tehsil: ' ipsumlorem ipsum lorem',
    created_dt: '3/20/2014',
    stoke: 'In stock',
    status: 'Live',
    signatureCatchPhrase: 'Cross-platform disintermediate workforce',
  },
  {
    id: '9s41r2',
    first_name: "D'angelo",
    last_name: 'Moen',
    mobileno: '12837492 ',
    warehouse:'Warehouse Name & address',
    address: '12837492 lorem ipsumlorem ipsum lorem',
    tehsil: 'lorem ipsumlorem ipsum lorem',
    created_dt: '3/9/2018',
    stoke: 'In stock',

    status: 'Draft',
    signatureCatchPhrase: 'Virtual local support',
  },
  // other data objects...
];