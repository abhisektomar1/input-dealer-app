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
import axios from "axios";
import { BASE_URL_APP } from "../../../utils";

type Inputs = {
  product_name: string;
  product_manufacturer: string;
  product_unit: string;
  product_price: string;
  product_quantity: string;
  product_image: any;
  product_type: string;
};

function NewProduct() {
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
      const formData = new FormData();
      formData.append("product_name", data.product_name);
      formData.append("product_manufacturer", data.product_manufacturer);
      formData.append("product_unit", data.product_unit);
      formData.append("product_price", data.product_price);
      formData.append("product_quantity", data.product_quantity);
      formData.append("product_image", data.product_image[0]);
      formData.append("product_type", data.product_type);
      formData.append("userid", "7");
      const res = await axios.post(
        `${BASE_URL_APP}/AddProductDetails_FPO`,
        formData,
      );
      console.log(res);

      toast("Product details added successfully");
      navigate("/dashboard/productList")
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Card className="p-4">
        <h1 className="p-3 text-xl font-bold">New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-row items-center justify-around gap-4 md:flex">
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Product Name
              </label>
              <Input
                {...register("product_name", {
                  required: true,
                })}
              />
              {errors.product_name && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product Name is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Product Manufacturer
              </label>
              <Input
                {...register("product_manufacturer", {
                  required: true,
                })}
              />
              {errors.product_manufacturer && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product Manufacturer is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Product Unit
              </label>
              <Input
                {...register("product_unit", {
                  required: true,
                })}
              />
              {errors.product_unit && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product Unit is required
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
                Product Price
              </label>
              <Input
                {...register("product_price", {
                  required: true,
                })}
              />
              {errors.product_price && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product Price is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Product Quantity
              </label>
              <Input
                {...register("product_quantity", {
                  required: true,
                })}
              />

              {errors.product_quantity && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product quantity is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Product Image
              </label>
              <Input
                type="file"
                {...register("product_image", {
                  required: true,
                })}
              />
              {errors.product_image && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product Image is required
                </p>
              )}
            </div>
          </div>
          <div className="mx-12 flex-row items-center justify-between gap-4 md:flex">
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Product Type
              </label>
              <Input
                {...register("product_type", {
                  required: true,
                })}
              />
              {errors.product_type && (
                <p style={{ color: "#ff0000", fontSize: 12 }}>
                  Product Type is required
                </p>
              )}
            </div>
            <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
              <Button className="w-[300px]" type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Product
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default NewProduct;
