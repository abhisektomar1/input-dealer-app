import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../service/AxiosInstance";
import { Textarea } from "../../../components/ui/text-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { BASE_URL_APP } from "../../../utils";
import { useNavigate } from "react-router-dom";

function EditAll({open, setOpen, id}:any) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, SetStatus] = useState<any>();
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(
       `${BASE_URL_APP}/UpdateProduct_DeatilsFPO`,
       {
         ...data,
         selling_status: status,
         product_id: id,
       }
     );
     toast("Product Updated Successfully");
     navigate("/dashboard/productList");
   } catch (error: any) {
     console.log(error);
     toast.error(error.response.data.message || "something went wrong!!");
   } finally {
     setIsLoading(false);
     setOpen(false)
   }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Poducts</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogDescription>
            <div className="flex flex-row items-start justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Description
                  </div>
                  <div>
                  <Textarea
                    {...register("productDescription",{
                      required:true
                    })}
                    placeholder="Description"
                    className="w-[350px]"
                  />
                  {errors.productDescription && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Description is required
                  </p>
                )}
                </div>
                  </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Quantity
                  </div>
                  <div>
                  <Input
                    {...register("quantity",{
                      required:true
                    })}
                    placeholder="Quantity"
                    className="w-[350px]"
                  />
                   {errors.quantity && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Quantity is required
                  </p>
                )}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Selling Status
                  </div>
                  <Controller
                    name="selling_status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(e: any) => {
                          field.onChange(e);
                          SetStatus(e);
                        }}
                        value={field.value || status}
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
                    )}
                  />
                </div>
            </DialogDescription>
            <Button className="w-full rounded mt-2" type="submit">
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditAll;
