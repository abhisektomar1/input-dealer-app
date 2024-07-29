import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/loginSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_APP } from "../../utils";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

type Inputs = {
  entered_otp: number;
};  

function OtpVerify() {
  const {email} = useParams()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();


  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      setTimer((prevTimer:number) => {
        if (prevTimer === 1) {
          clearInterval(interval); // Clear the interval when timer reaches 0
        }
        return prevTimer - 1; // Decrease the timer value
      });
    }, 1000); // Update timer every second

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []);
  
  const handleResendOTP = async () => {
    try {
      const res = await axios.post(`${BASE_URL_APP}/forgot_sendotp`,email );
      toast("Otp Send");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally{
      setTimer(30);
    }
   
  };// Run effect only once on component mount

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    console.log(Number(data.entered_otp));
    const entered_otp = Number(data.entered_otp)
    try {
      await axios.post(`${BASE_URL_APP}/verify_otp`, {
        entered_otp,
        email
      });
      navigate(`/dashboard/NewPassword/${email}`);
      toast("otp verfied");
    } catch (error: any) {
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
              Enter OTP.
            </h3>
          
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary ml-8"
                >
                  OTP
                </label>
                <div className="self-center">
                  {/* @ts-expect-error dfdf */ }
                <InputOTP
                   {...register("entered_otp", { required: true })}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                </div>
                {errors.entered_otp && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    OTP is Required
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
              onClick={handleResendOTP} disabled={timer !== 0}
            >
              {
                timer !== 0 ? `You can resend OTP after ${timer} sec` : "Resend Otp"
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;
