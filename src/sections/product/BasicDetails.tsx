import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/text-area";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { BASE_URL_APP } from "../../utils";
import { useAppSelector } from "../../store/hooks";

function BasicDetails({image}:any) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sellBy, setSellBy] = useState<any>();
  const [product_unit, Setproduct_unit] = useState<any>();
  const [productType, setproductType] = useState<any>();
  const user = useAppSelector((state: any) => state.login.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  const onSubmit = async (data: any) => {

    setIsLoading(true);
    console.log(data);

    try {
      const formData = new FormData();

      formData.append('product_name', data.product_name);
      formData.append('productDescription', data.productDescription);
      formData.append('product_manufacturer', data.product_manufacturer);
      formData.append('product_unit', product_unit);
      formData.append('product_price', data.product_price);
      formData.append('product_quantity', data.product_quantity);
      formData.append('product_type', productType);
      formData.append('weight', data.weight);
      formData.append('shelf_life', data.shelf_life);
      formData.append('storage_temp', data.storage_temp);
      formData.append('sellby', sellBy);
      formData.append('storage_use', data.storage_use);
      formData.append('product_image', image); // Assuming 'image' is a File object
      formData.append("userid", user?.fpo_id);
      const res = await axios.post(
        `${BASE_URL_APP}/AddProductDetails_FPO`,
        formData,
      );
      toast("Profile Updated");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            product Name <span className="text-destructive">*</span>
          </div>
          <Input
            {...register("product_name")}
            placeholder="Product name"
            className="w-[350px]"
          />
        </div>
        <div className="flex flex-row items-start justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Description
          </div>
          <Textarea
            {...register("productDescription")}
            placeholder="Description"
            className="w-[350px]"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            sellby
          </div>
          <Select
            onValueChange={(e: any) => {
              setSellBy(e);
            }}
          >
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Select sell Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pcs">Pieces</SelectItem>
              <SelectItem value="Weight">Weight</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {sellBy === "Pcs" && (
          <>
            <div className="flex flex-row items-center justify-between gap-4 p-2">
              <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                Pieces
              </div>
              <Input
                {...register("product_quantity")}
                placeholder="Pieces"
                className="w-[350px]"
              />
            </div>
          </>
        )}
        {sellBy === "Weight" && (
          <>
            <div className="flex flex-row items-center justify-between gap-4 p-2">
              <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                Weight
              </div>
              <Input
                {...register("weight")}
                placeholder="Weight"
                className="w-[350px]"
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-4 p-2">
              <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                Weight Class
              </div>
              <Select
                onValueChange={(e: any) => {
                  Setproduct_unit(e);
                }}
              >
                <SelectTrigger className="w-[350px]">
                  <SelectValue placeholder="Select Weight Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KG">kg</SelectItem>
                  <SelectItem value="GM">g</SelectItem>
                  <SelectItem value="L">l</SelectItem>
                  <SelectItem value="ML">ml</SelectItem>
                  <SelectItem value="DOZEN">dozen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Product Manufacturer
          </div>
          <Input
            {...register("product_manufacturer")}
            placeholder="product manufacturer"
            className="w-[350px]"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Selling price
          </div>
          <Input
            {...register("product_price")}
            placeholder="Price"
            className="w-[350px]"
          />
        </div>{" "}
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Product Type
          </div>
            <Select
            onValueChange={(e: any) => {
              setproductType(e);
            }}
          >
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Select Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pesticides">Pesticides</SelectItem>
              <SelectItem value="Crop">Crop</SelectItem>
              <SelectItem value="Fertilizers">Fertilizers</SelectItem>
              <SelectItem value="Herbicides">Herbicides</SelectItem>
              <SelectItem value="Fungicides">Fungicides</SelectItem>
              <SelectItem value="Insecticides">WeInsecticidesight</SelectItem>
              <SelectItem value="Seeds">Seeds</SelectItem>
              <SelectItem value="Equipments">Equipments</SelectItem>
              <SelectItem value="Finish Goods">Finish Goods</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Shelf Life
          </div>
          <Input
            {...register("shelf_life")}
            placeholder="Shelf Life"
            className="w-[350px]"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Storage Temp
          </div>
          <Input
            {...register("storage_temp")}
            placeholder="Storage Temp"
            className="w-[350px]"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4 p-2">
          <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
            Storage Use
          </div>
          <Input
            {...register("storage_use")}
            placeholder="Storage Use"
            className="w-[350px]"
          />
        </div>
        <div className="flex flex-row">
          <div className="w-[580px]" />
        <Button type="submit" className="rounded">
        {
                    isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) 
                  }
          Save
        </Button>
        </div>
      
      </form>
    </>
  );
}

export default BasicDetails;
