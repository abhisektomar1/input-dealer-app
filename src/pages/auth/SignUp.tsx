import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL_APP } from "../../utils";
import { Input } from "../../components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  password: string;
  mobile_no: string;
  confirm_password: string;
};

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const password = watch("password");
  console.log(password);

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    console.log(data);
    const { confirm_password, ...modifiedData } = data;
    try {
      const res = await axios.post(`${BASE_URL_APP}/Fpo_Signup`, modifiedData);
      console.log(res);
      toast("Sign Up Successfull");
      navigate("/login");
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
              Sign up
            </h3>
            <p className="text-center text-base font-normal leading-[16.8px] tracking-[0.17px] text-gray-500">
              Sign up to start your journey with us
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  name
                </label>
                <Input {...register("name", { required: true })} />
                {errors.name && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    name is required
                  </p>
                )}
              </div>
              <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Phone
                </label>
                <Input {...register("mobile_no", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                  onKeyDown={(e) => {
                    const isNumeric = /^[0-9]$/.test(e.key);
                    const isBackspaceOrDelete = e.key === 'Backspace' || e.key === 'Delete';
                    if (!isNumeric && !isBackspaceOrDelete) {
                      e.preventDefault();
                    }
                  }} />
                {errors.mobile_no && errors.mobile_no.type === "required" && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>Mobile number is required</p>
                )}
                {errors.mobile_no && errors.mobile_no.type === "minLength" && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>Mobile number should be at least 10 digits long</p>
                )}
              </div>
              <div className="relative mt-4 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    // pattern:
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&()_+])[A-Za-z\d!@#$%^&*()_+]{5,10}$/,
                  })}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="absolute right-[12px] top-[35px]"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    className="absolute right-[12px] top-[35px]"
                  />
                )}
                {errors.password && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Password is required and must contain at least one lowercase
                    letter, one uppercase letter, and one special character
                  </p>
                )}
              </div>
              <div className="relative mt-4 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Confirm Password
                </label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) =>
                      value === password || "The passwords do not match",
                    // pattern:
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&()_+])[A-Za-z\d!@#$%^&*()_+]{5,10}$/,
                  })}
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowConfirmPassword(false)}
                    className="absolute right-[12px] top-[35px]"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowConfirmPassword(true)}
                    className="absolute right-[12px] top-[35px]"
                  />
                )}
                {errors.confirm_password && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    The passwords do not match
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button type="submit" className="mt-4 w-[300px] rounded">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  SIGN UP
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
              LOG UP
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
