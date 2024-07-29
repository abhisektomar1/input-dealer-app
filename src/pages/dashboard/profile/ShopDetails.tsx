import React, { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";
import axiosInstance from "../../../service/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ShopDetails = () => {
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

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
  return (
    <div className="container mx-auto p-1">
      <div className="m-4 grid w-2/3 grid-cols-1 gap-4">
        <Card className="rounded border-none p-2 shadow-md">
          <div className="mt-6 flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
              Shop Details
            </div>
            <img src="/images/edit.svg" className="hover:cursor-pointer" onClick={() => {
              navigate("/dashboard/ShopEdit")
            }} />
          </div>
          <div className="flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
             Shop Name
            </div>
            <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
              {data?.shop_details[0]?.shopName}
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
              Mobile No.
            </div>
            <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
              {data?.shop_details[0]?.shopContactNo}
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
              Open Time
            </div>
            <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
            {data?.shop_details[0]?.shop_opentime}
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
              Close Time
            </div>
            <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
            {data?.shop_details[0]?.shop_closetime}
            </div>
          </div><div className="flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
              Open Days
            </div>
            <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
            {data?.shop_details[0]?.shop_opendays}

            </div>
          </div><div className="flex w-full flex-row items-center justify-between p-2">
            <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
              Close Day
            </div>
            <div className="font-roboto font-small text-left text-base leading-6 tracking-wide text-slate-700">
            {data?.shop_details[0]?.shop_closedon}

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShopDetails;
