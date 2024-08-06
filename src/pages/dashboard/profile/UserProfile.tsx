import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/AxiosInstance";
import { Loader2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import FPODetails from "./FPODetails";
import ShopDetails from "./ShopDetails";

type Inputs = {
  mobile_no: number;
  registration_id: string;
  established_date: string;
  address: string;
  pincode: number;
  state: string;
  district: string;
  village: string;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<any>();
  console.log(data);

  useEffect(() => {
    axiosInstance
      .post(`/GetSupplierProfileDetails`)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    setValue("registration_id", data?.registration_id);
    setValue("mobile_no", data?.mobile_no);
    setValue("address", data?.address);
    setValue("pincode", data?.pincode);
    setValue("state", data?.state);
    setValue("district", data?.district);
    setValue("village", data?.village);
    setValue("established_date", data?.established_date);
  }, [data]);

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
      const res = await axiosInstance.post(`/Supplier_Profile_Update`, data);
      console.log(res);

      toast("Profile Updated");
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
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Supplier Details</TabsTrigger>
            <TabsTrigger value="password">Shop Details</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <FPODetails />
          </TabsContent>
          <TabsContent value="password">
            <ShopDetails />
          </TabsContent>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default UserProfile;
