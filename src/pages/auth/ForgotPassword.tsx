import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_APP } from "../../utils";
import { Input } from "../../components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
};

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.post(`${BASE_URL_APP}/forgot_sendotp`, data);
      navigate(`/otpVerify/${data.email}`)
      toast("Otp Send");
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/loginBack.png')" }}
      >
        <div className="top-30 left-80 rounded-lg bg-white p-8 shadow-lg md:absolute">
          {/* Login form */}

          <div className="flex flex-col items-center justify-center p-8">
            <h3 className="font-roboto text-center text-3xl font-medium leading-[56.02px]">
              Forgot Password ?
            </h3>
            <p className="text-center text-base font-normal leading-[16.8px] tracking-[0.17px] text-gray-500">
              Enter your registered Email.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Email
                </label>
                <Input {...register("email", { required: true })} />
                {errors.email && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Email is required
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button type="submit" className="mt-4 w-[300px] rounded">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send OTP
                </Button>
              </div>
            </form>
            <Button
              variant="link"
              className="mt-4 w-[300px] rounded"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
