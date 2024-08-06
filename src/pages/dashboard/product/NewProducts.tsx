import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import { Card, CardTitle } from "../../../components/ui/card";
import { useAppSelector } from "../../../store/hooks";
import { FieldError, useForm } from "react-hook-form";
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

function NewProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [crops, setCrops] = useState<any>();
  const [cropsId, setCropsId] = useState<any>();

  const [variety, setVariety] = useState<any>();
  const [varietyId, setVarietyId] = useState<any>();

  const [status, SetStatus] = useState<any>();
  const [mType, setmType] = useState<any>();
  const lan = useAppSelector((state) => state.lan.lan);
  const user = useAppSelector((state: any) => state.login.user);

  useEffect(() => {
    axiosInstance
      .post(`/GetCrops`, {
        user_language: lan,
      })
      .then((res) => setCrops(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`/GetCropVariety`, {
        crop_id: cropsId,
      })
      .then((res) => setVariety(res.data.data))
      .catch((error) => console.log(error));
  }, [cropsId]);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    console.log(file);

    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    const { composition, manufacturerName, ...dataMy } = data;
    let productType;
    if (id === "Finish Goods") {
      productType = 3;
    } else if (id === "Crops") {
      productType = 2;
    } else {
      productType = 1;
    }

    setIsLoading(true);

    let dataa;
    if (id === "Finish Goods") {
      dataa = {
        ...data,
        purchase_price: Number(data.purchase_price),
        selling_price: Number(data.unit_price),
        // discount: Number(data.discount),
        final_price: Number(data.final_price),
        filter_type: id,
        measurement_type: mType,
        selling_status: status,
        producttype: productType,
        measurement_unit: Number(data.measurement_unit),
        quantity: Number(data.quantity),
      };
    } else if (id === "Crops") {
      dataa = {
        ...dataMy,
        purchase_price: Number(data.purchase_price),
        selling_price: Number(data.unit_price),
        // discount: Number(data.discount),
        final_price: Number(data.final_price),
        filter_type: id,
        measurement_type: mType,
        selling_status: status,
        producttype: productType,
        crop_id: Number(cropsId),
        variety: Number(varietyId),
        measurement_unit: Number(data.measurement_unit),
        quantity: Number(data.quantity),
      };
    } else {
      dataa = {
        ...data,
        purchase_price: Number(data.purchase_price),
        selling_price: Number(data.unit_price),
        // discount: Number(data.discount),
        final_price: Number(data.final_price),
        filter_type: id,
        measurement_type: mType,
        selling_status: status,
        producttype: productType,
        measurement_unit: Number(data.measurement_unit),
        quantity: Number(data.quantity),
      };
    }

    try {
      const res = await axiosInstance.post(
        `${BASE_URL_APP}/AddProductDetails_Suppliers`,
        dataa,
      );
      toast("Product Created Successfully");
      navigate("/dashboard/productList");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
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
              <div className="flex flex-col">
                <Card className="my-2 rounded p-4 shadow-md">
                  <CardTitle className="border-b-2 pb-2">
                    Enter Product Details
                  </CardTitle>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Product Name <span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                      <Input
                        {...register("productName", {
                          required: "Product name is required",
                        })}
                        placeholder="Product name"
                      />
                      {renderErrorMessage(errors.productName)}
                    </div>
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
                  {id === "Crops" && (
                    <>
                      <div className="flex flex-row items-center justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Crop Type
                        </div>
                        <Select
                          onValueChange={(e: any) => {
                            setCropsId(e);
                          }}
                          value={cropsId}
                        >
                          <SelectTrigger className="w-[350px]">
                            <SelectValue placeholder="Select Crop Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {crops?.map((crop: any) => (
                              <SelectItem
                                key={crop.id}
                                value={crop.id.toString()}
                              >
                                {crop.crop_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Variety Type
                        </div>
                        <Select
                          onValueChange={(value) => {
                            setVarietyId(value);
                          }}
                        >
                          <SelectTrigger className="w-[350px]">
                            <SelectValue placeholder="Select Crop Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {variety?.map((crop: any) => (
                              <SelectItem
                                key={crop.id}
                                value={crop.id.toString()}
                              >
                                {crop.variety}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  {id !== "Crops" && (
                    <>
                      <div className="flex flex-row items-center justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Composition
                        </div>
                        <Input
                          {...register("composition")}
                          placeholder="composition"
                          className="w-[350px]"
                        />
                      </div>
                      <div className="flex flex-row items-center justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Manufacturer Name
                        </div>
                        <Input
                          {...register("manufacturerName")}
                          placeholder="Manufacturer Name"
                          className="w-[350px]"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Quantity<span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                      <Input
                        {...register("quantity", {
                          required: "Product name is required",
                        })}
                        placeholder="Quantity"
                      />
                      {renderErrorMessage(errors.quantity)}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Measurement Unit
                      <span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                      <Input
                        {...register("measurement_unit", {
                          required: "measurement_unit is required",
                        })}
                        placeholder="Measurement Unit"
                      />
                      {renderErrorMessage(errors.measurement_unit)}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Measurement Type
                      <span className="text-destructive">*</span>
                    </div>
                    <Select
                      onValueChange={(e: any) => {
                        setmType(e);
                      }}
                    >
                      <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Select Measurement Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KG">KG</SelectItem>
                        <SelectItem value="GM">GM</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="ML">ML</SelectItem>
                        <SelectItem value="DOZEN">DOZEN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Selling Status<span className="text-destructive">*</span>
                    </div>
                    <Select
                      onValueChange={(e: any) => {
                        SetStatus(e);
                      }}
                    >
                      <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Select Selling Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Category<span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                    <Input
                      {...register("Category",{
                        required: "Category is required",
                      })}
                      placeholder="Category"
                    />
                     {renderErrorMessage(errors.Category)}
                    </div>
                   
                  </div>
                </Card>
                <Card className="my-2 rounded p-4 shadow-md">
                  <CardTitle className="border-b-2 pb-2">
                    Price Details
                  </CardTitle>
                 
                  {/* <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      discount
                    </div>
                    
                    <Input
                      {...register("discount")}
                      placeholder="Price"
                      className="w-[350px]"
                    />
                  </div> */}
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Final Price<span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                    <Input
                      {...register("final_price",{
                        required: "Final price is required",
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: "Invalid price format",
                        },
                      })}
                      placeholder=" Final Price"
                    />
                    {renderErrorMessage(errors.final_price)}
                    </div>
                  </div>
                </Card>
                <Card className="my-2 rounded p-4 shadow-md">
                  <CardTitle className="border-b-2 pb-2">
                    Seller Details
                  </CardTitle>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Party Name<span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                    <Input
                      {...register("party_name",{
                        required: "Party Name is required",
                      })}
                      placeholder="Party Name"
                    />
                    {renderErrorMessage(errors.party_name)}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Mobile Number<span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                      <Input
                        {...register("mobileno", {
                          required: "Mobile No is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Invalid mobile number",
                          },
                        })}
                        placeholder="Mobile Number"
                      />
                      {renderErrorMessage(errors.mobileno)}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Unit Price <span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                      <Input
                        {...register("unit_price", {
                          required: "Unit price is required",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Invalid price format",
                          },
                        })}
                        placeholder="Unit Price"
                      />
                      {renderErrorMessage(errors.unit_price)}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Purchase price<span className="text-destructive">*</span>
                    </div>
                    <div className="w-[350px]">
                    <Input
                      {...register("purchase_price",{
                        required: "Purchase price is required",
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: "Invalid price format",
                        },
                      })}
                      placeholder="Purchase Price"
                    />
                    {renderErrorMessage(errors.purchase_price)}
                    </div>
                   
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Company Name
                    </div>
                    <div className="w-[350px]">
                    <Input
                      {...register("company_name")}
                      placeholder="Company Name"
                    />
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 p-2">
                    <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                      Company Gst No.
                    </div>
                    <div className="w-[350px]">
                    <Input
                      {...register("party_gst")}
                      placeholder="Gst No."
                    />
                    </div>
                  </div>
                </Card>

                <div className="flex flex-row">
                  <div className="w-[580px]" />
                  <Button type="submit" className="rounded">
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

export default NewProducts;
