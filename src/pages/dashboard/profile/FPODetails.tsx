import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../../components/ui/card";
import axiosInstance from "../../../service/AxiosInstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { CircleUserRound, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppSelector } from "../../../store/hooks";
import { BASE_URL_APP } from "../../../utils";

const FPODetails = () => {
  const [data, setData] = useState<any>();
  console.log(data);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<any>();
  const user = useAppSelector((state: any) => state.login.user);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  useEffect(() => {
    axiosInstance
      .post(`/GetFPODetails`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    setValue("fpo_name", data?.basic_info[0]?.fpo_name);
    setValue("mobile_no", data?.basic_info[0]?.mobile_no);
    setValue("address", data?.basic_info[0]?.address);
    setValue(
      "business_establishdate",
      data?.bank_business[0]?.business_establishdate,
    );
    setValue("registration_id", data?.bank_business[0]?.registration_id);
    setValue("pan_no", data?.bank_business[0]?.pan_no);
    setValue("gst_number", data?.bank_business[0]?.gst_number);
    setValue("accountholder_name", data?.bank_business[0]?.accountholder_name);
    setValue("account_number", data?.bank_business[0]?.account_number);
    setValue("bank_name", data?.bank_business[0]?.bank_name);
    setValue("ifsc_code", data?.bank_business[0]?.ifsc_code);
  }, [data, setValue]);

  const handleFileChange = async  () => {
    
    const file = imageRef.current.files[0];
    const formData = new FormData();
    formData.append("profile_image", file);
    formData.append("userid", user?.obj_id);

    try {
      await axios.post(`${BASE_URL_APP}/FPOProfilePictureUpdate`, 
        formData
      );
      toast("Profile Updated Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally{
      window.location.reload();
    }
  };
  const onSubmit = async (data: any) => {
    const { business_establishdate, ...dataa } = data;
    setIsLoading(true);

    try {
      const res = await axiosInstance.post(`/FPO_profile_update`, {
        business_establishdate: "2023-07-06",
        ...dataa,
      });
      toast("Profile Updated  Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <div>
        <div className="container mx-auto p-1">
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="col-span-12 p-4 md:col-span-5">
              <div className="flex flex-col items-center justify-center">
              {data?.basic_info[0]?.profile ? (
           <img
           className="mt-4 h-44 w-44 rounded-full hover:cursor-pointer"
           src={`${BASE_URL_APP}/media/${data?.basic_info[0].profile}`}
           onClick={() => {
             imageRef.current.click();
           }}
         />
          ) : (
            <CircleUserRound
              size={100}
              color="#a49d9d"
              strokeWidth={1.5}
              absoluteStrokeWidth
              className="hover:cursor-pointer"
              onClick={() => {
                imageRef.current.click();
              }}
            />
          )}
               
                <input
                  ref={imageRef}
                  type="file"
                  onChange={() => {
                    handleFileChange()
                  }}
                  className="hidden hover:cursor-pointer"
                  accept="image/*"
                />
                <div className="mt-6 flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    {data?.basic_info[0]?.fpo_name}
                  </div>
                  <DialogTrigger asChild>
                    <img
                      src="/images/edit.svg"
                      className="hover:cursor-pointer"
                    />
                  </DialogTrigger>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Phone Number
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.basic_info[0]?.mobile_no}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Address
                  </div>
                  <div className="font-roboto font-small text-right text-base leading-6 tracking-wide text-slate-700">
                    {data?.basic_info[0]?.address}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 p-6 md:col-span-7">
              <Card className="mb-4 rounded border-none p-2 shadow-md">
                <div className="mt-6 flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Business Details
                  </div>
                  <DialogTrigger asChild>
                    <img
                      src="/images/edit.svg"
                      className="hover:cursor-pointer"
                    />
                  </DialogTrigger>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Established Date
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.business_establishdate}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Reg. ID
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.registration_id}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    PAN Number
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.pan_no}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    GST Number
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.gst_number}
                  </div>
                </div>
              </Card>
              <Card className="rounded border-none p-2 shadow-md">
                <div className="mt-6 flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Bank Details
                  </div>
                  <DialogTrigger asChild>
                    <img
                      src="/images/edit.svg"
                      className="hover:cursor-pointer"
                    />
                  </DialogTrigger>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Account Holder Name
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.accountholder_name}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Account Number
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.account_number}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Bank Name
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.bank_name}
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    IFSC Code
                  </div>
                  <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
                    {data?.bank_business[0]?.ifsc_code}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <DialogContent className="h-screen">
            <DialogHeader>
              <DialogTitle>Edit FPO Profile</DialogTitle>
            </DialogHeader>
            <DialogDescription className="overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("fpo_name")}
                    placeholder="FPO Name"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("mobile_no")}
                    placeholder="Phone Number"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("address")}
                    placeholder="Address"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("business_establishdate")}
                    placeholder="Established Date"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("registration_id")}
                    placeholder="Reg. ID"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("pan_no")}
                    placeholder="PAN Number"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("gst_number")}
                    placeholder="GST Number"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("accountholder_name")}
                    placeholder="Account Holder Name"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("account_number", {
                      valueAsNumber: true,
                    })}
                    placeholder="Account Number"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("bank_name")}
                    placeholder="Bank Name"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row items-center justify-between p-2">
                  <Input
                    {...register("ifsc_code")}
                    placeholder="IFSC Code"
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full rounded">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </form>
            </DialogDescription>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default FPODetails;
