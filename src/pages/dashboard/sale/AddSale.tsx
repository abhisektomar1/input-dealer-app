import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { useAppSelector } from "../../../store/hooks";
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { BASE_URL_APP } from "../../../utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/text-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../service/AxiosInstance";
import { Autocomplete, TextField } from "@mui/material";

const paymentMethods = [
  { value: "Cash", label: "Cash" },
  { value: "Card", label: "Card" },
  { value: "Online", label: "Online" },
  { value: "Cheque", label: "Cheque" },
  { value: "Others", label: "Others" },
];

function NewSale() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isFpo, setIsFpo] = useState(false);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<any>();

  const numberInput = watch("mobile_no");
  const watchedForm = watch();

  useEffect(() => {
    const calculateTotalPrice = (): number => {
      if (
        !watchedForm.products ||
        !Array.isArray(watchedForm.products) ||
        !data
      ) {
        return 0;
      }
      return watchedForm.products.reduce((total: number, product: any) => {
        const selectedProduct = data.find(
          (p: any) => p.inventory_id === product.inventory_id,
        );
        if (selectedProduct && product.Quantity) {
          return total + selectedProduct.final_price * product.Quantity;
        }
        return total;
      }, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [watchedForm, data]);

  const checkNumberAndUpdateDiscount = async (number: any) => {
    try {
      const res = await axiosInstance.post(
        `${BASE_URL_APP}/CheckCustomerisFarmerornot`,
        {
          mobile_no: number,
        },
      );
      console.log(res);
      setIsFpo(res.data.associated);
    } catch (error) {
      console.error("Error checking number:", error);
    }
  };

  useEffect(() => {
    if (numberInput && numberInput.length === 10) {
      checkNumberAndUpdateDiscount(numberInput);
    }
  }, [numberInput]);

  useEffect(() => {
    axiosInstance
      .post(`/GetThirdPartySupplier_AllProducts`)
      .then((res) => {
        if (res.status === 200) {
          setData(
            res.data.products.filter(
              (product: any) => product.stock_status !== "Out of Stock",
            ),
          );
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong!");
      });
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  // Usage:
  const today = formatDate(new Date());

  const onSubmit = async (data: any) => {
    if (data.products.length === 0) {
      toast.error("Please select atleast one product");
      return;
    }

    setIsLoading(true);
    const saleData = {
      ...data,
      sale_date: today,
    };

    try {
      await axiosInstance.post(`${BASE_URL_APP}/AddSalesbySupplier`, saleData);
      toast("Sale Done Successfully");
      navigate("/dashboard/sale");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrorMessage = (error: FieldError | any) => {
    return error ? (
      <p className="text-sm text-destructive">{error.message}</p>
    ) : null;
  };
  return (
    <Layout>
      <Card className="min-h-screen rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 p-4 md:col-span-8">
              <h1 className="p-3 text-xl font-bold">Add Sale</h1>
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Buyer Name <span className="text-destructive">*</span>
                  </div>
                  <div>
                    <Input
                      className="w-[350px]"
                      {...register("buyer_name", {
                        required: "Buyer name is required",
                      })}
                      placeholder="Buyer Name"
                    />
                    {renderErrorMessage(errors.buyer_name)}
                  </div>
                </div>
                <div className="flex flex-row items-start justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Mobile Number<span className="text-destructive">*</span>
                  </div>
                  <div>
                    <Input
                      className="w-[350px]"
                      {...register("mobile_no", {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                      })}
                      placeholder="Mobile Number"
                      onKeyDown={(e) => {
                        const isNumeric = /^[0-9]$/.test(e.key);
                        const isBackspaceOrDelete =
                          e.key === "Backspace" || e.key === "Delete";
                        if (!isNumeric && !isBackspaceOrDelete) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.mobile_no &&
                      errors.mobile_no.type === "required" && (
                        <p style={{ color: "#ff0000", fontSize: 12 }}>
                          Mobile number is required
                        </p>
                      )}
                    {errors.mobile_no &&
                      errors.mobile_no.type === "minLength" && (
                        <p style={{ color: "#ff0000", fontSize: 12 }}>
                          Mobile number should be at least 10 digits long
                        </p>
                      )}
                  </div>
                </div>
                {isFpo && (
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Buyer Discount
                    </div>
                    <div>
                      <Input
                        className="w-[350px]"
                        {...register("discount", {
                          valueAsNumber: true,
                        })}
                        placeholder="Enter Discount"
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Address
                  </div>
                  <Textarea
                    className="w-[350px]"
                    {...register("address", {})}
                    placeholder="Address"
                  />
                </div>{" "}
                <div className="flex flex-row items-center justify-between gap-4 p-2 ">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Mode Of Payment
                  </div>

                  <div className="w-[350px]">
                    <Controller
                      name="payment"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Payment Method" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <h3 className="my-2 font-medium">
                  Products<span className="text-destructive">*</span>
                </h3>
                {fields.map((field, index) => (
                  <Card className="mb-2 rounded p-4">
                    <div key={field.id} className="flex flex-row flex-col">
                      <div className="flex flex-row items-start justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Select Product
                        </div>
                        <Controller
                          name={`products.${index}.inventory_id`}
                          control={control}
                          rules={{ required: "Product is required" }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <Autocomplete
                              disablePortal
                              id={`product-autocomplete-${index}`}
                              options={data}
                              sx={{ width: 300 }}
                              getOptionLabel={(option) =>
                                option.productName +
                                ",  " +
                                option.supplier_name +
                                ",  " +
                                option.final_price +
                                "Rs"
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.inventory_id === (value as any)
                              }
                              onChange={(_, newValue) =>
                                onChange(
                                  newValue ? newValue.inventory_id : null,
                                )
                              }
                              value={
                                data.find(
                                  (product: any) =>
                                    product.inventory_id === value,
                                ) || null
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Product"
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          )}
                        />
                      </div>
                      <div className="flex flex-row items-start justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Quantity
                        </div>
                        <Input
                          type="number"
                          className="w-[350px]"
                          {...register(`products.${index}.Quantity` as const, {
                            required: "Quantity is required",
                            min: 1,
                            valueAsNumber: true,
                          })}
                          placeholder="Quantity"
                        />
                      </div>
                      <Button
                        type="button"
                        className="my-2 w-[100px] self-end rounded"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
                <div className="mt-2 flex flex-col ">
                  <div className="flex fex-row justify-between">
                  <div className="font-roboto mt-4 text-right text-lg font-medium">
                    Total Price: ₹{totalPrice.toFixed(2)}
                  </div>
                  <Button
                    type="button"
                    className="my-2 mr-4 w-[100px] self-end rounded"
                    onClick={() =>
                      append({
                        Quantity: 0,
                        inventory_id: 0,
                      })
                    }
                  >
                    Add Product
                  </Button>
                  </div>
                  
                
                  <Button type="submit" className="mt-2 w-full rounded">
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default NewSale;
