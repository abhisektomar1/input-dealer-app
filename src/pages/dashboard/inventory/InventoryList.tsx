import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table";
import { toast } from "react-toastify";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { BASE_URL_APP } from "../../../utils";
import axiosInstance from "../../../service/AxiosInstance";

function InventoryList() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [filter, setFilter] = useState<string>("Agricultural Inputs");
  const [selectedRow, setSelectedRow] = useState<any>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [stock, setStock] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axiosInstance
      .post(`/ShowInventory`, {
        filter_type: filter,
      })
      .then((res: any) => {
        if (res.status === 200) {
          setData(res.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.response?.data?.error || "Something went wrong!");
      });
  }, [filter]);

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
            accessorKey: "product_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Product Name",
          },
          {
            accessorKey: "Category",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Category",
          },
          {
            accessorFn: (row: any) => `${row.stock_status}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Stock Status",
            size: 250,
            Cell: ({ renderedCellValue, row }: any) => (
           
                row?.original.stock_status === "Low Stock" ? (
                 <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    color:"red",
                  }}
                >
                    <span>{row.original.stock_status}</span>
                </Box>
                ) : (
                  <span>{row.original.stock_status}</span>
                )
           
            ),
          },
          {
            accessorKey: "stock_quantity",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Stock Quantity",
          },
        ],
      },
    ],
    [],
  );

  const editClick = (e: React.MouseEvent, row: any) => {
    setSelectedRow(row);
    handleClickOpen();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    console.log(data);

    try {
      const res = await axiosInstance.post(
        `${BASE_URL_APP}/UpdateInventorybyFPO`,
        {
          inventory_id: selectedRow?.inventory_id,
          new_stock: stock,
        },
      );
      toast("quantity changed successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Card className="p-4">
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-xl font-bold">Inventory List</h1>
        </div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger
              onClick={() => setFilter("Agricultural Inputs")}
              value="account"
            >
              Agricultural Inputs
            </TabsTrigger>
            <TabsTrigger onClick={() => setFilter("Crops")} value="password">
              Crops
            </TabsTrigger>
            <TabsTrigger onClick={() => setFilter("Finish Goods")} value="regt">
              Finished Product
            </TabsTrigger>
          </TabsList>
          <div className="tableDatadiv px-3 py-2">
            <Table
              {...tableProps}
              columns={columns}
              data={data}
              isEdit={true}
              editClick={editClick}
            ></Table>
          </div>
        </Tabs>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: any) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Edit Quantity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit quantity, please enter the new quantity. And make sure
              they don not exceed the product quantity.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Stock quantity"
              fullWidth
              variant="standard"
              value={stock}
              onChange={(e: any) => {
                setStock(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outline" className="rounded" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} className="rounded" type="submit">
              {" "}
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}{" "}
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Layout>
  );
}

export default InventoryList;
