import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../service/AxiosInstance";

function AddFarmer() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
     await axiosInstance.post("/Add_FarmerbyFpo", {
        ...data,
      });
      toast("Farmer added Successfully!!");
    } catch (error: any) {
      console.log(error);
      reset()
      toast.error(error.response.data.message || "something went weong");
    } finally {
      setIsLoading(false);
      setOpen(false)

    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded">Add Farmer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Farmer</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogDescription>
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Name
                </label>
                <Input
                  {...register("farmer_name", {
                    required: true,
                  })}
                />
                {errors.farmer_name && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Farmer Name is required
                  </p>
                )}
              </div>
              <div className="my-4 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Mobile No.
                </label>
                <Input
                  {...register("farmer_mobile", {
                    required: true,
                  })}
                />
                {errors.farmer_mobile && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Mobile No. is required
                  </p>
                )}
              </div>
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Village
                </label>
                <Input
                  {...register("farmer_village", {
                    required: true,
                  })}
                />
                {errors.farmer_village && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Farmer Village is required
                  </p>
                )}
              </div>{" "}
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Block
                </label>
                <Input
                  {...register("farmer_block", {
                    required: true,
                  })}
                />
                {errors.farmer_block && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Farmer Block is required
                  </p>
                )}
              </div>{" "}
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Land Area
                </label>
                <Input
                  {...register("land_area", {
                    required: true,
                    valueAsNumber:true
                  })}
                />
                {errors.land_area && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Land Area is required
                  </p>
                )}
              </div>
            </DialogDescription>
            <Button className="w-full rounded mt-2" type="submit">
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add farmer
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddFarmer;
