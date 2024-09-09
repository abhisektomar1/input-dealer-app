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
