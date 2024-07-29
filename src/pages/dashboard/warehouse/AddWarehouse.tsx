import React, { useState } from "react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../service/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL_APP } from "../../../utils";

type Inputs = {
  warehouse_name: string;
  warehouse_agentname: string;
  warehouse_agentcontact: string;
  warehouse_address: string;
  warehouse_city: string;
  warehouse_state: any;
};

function AddWarehouse() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axiosInstance.post(
        `${BASE_URL_APP}/AddWarehouseDetails`,
        data,
      );
      console.log(res);
      toast("Warehouse added successfully");
      navigate("/dashboard/productList");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Card className="p-4 py-8">
        <h1 className="p-3 text-xl font-bold">New Warehouse</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-row items-center justify-around gap-4 md:flex">
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Warehouse Name
              </label>
              <Input
                {...register("warehouse_name", {
                  required: true,
                })}
              />
              {errors.warehouse_name && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Warehouse Name is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Warehouse Agent Name
              </label>
              <Input
                {...register("warehouse_agentname", {
                  required: true,
                })}
              />
              {errors.warehouse_agentname && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Agent Name is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Warehouse Agent Contact
              </label>
              <Input
                {...register("warehouse_agentcontact", {
                  required: true,
                })}
              />
              {errors.warehouse_agentcontact && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  phone is required
                </p>
              )}
            </div>
          </div>
          <div className="flex-row items-center justify-around gap-4 md:flex">
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Warehouse Address
              </label>
              <Input
                {...register("warehouse_address", {
                  required: true,
                })}
              />
              {errors.warehouse_address && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Address is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Warehouse City
              </label>
              <Input
                {...register("warehouse_city", {
                  required: true,
                })}
              />

              {errors.warehouse_city && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  City is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Warehouse State
              </label>
              <Input
                {...register("warehouse_state", {
                  required: true,
                })}
              />
              {errors.warehouse_state && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  State is required
                </p>
              )}
            </div>
          </div>
          <div className="mx-12 flex-row items-center justify-between gap-4 md:flex">
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <Button className="w-[300px]" type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Warehouse
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default AddWarehouse;
