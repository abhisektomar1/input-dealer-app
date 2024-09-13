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
  mobile: string;
  password: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.post(`${BASE_URL_APP}/fposupplier/UserLogin`, {
        user_type:"supplier",
        ...data
      });
      console.log(res);
      dispatch(setUser(res.data))
      localStorage.setItem("token", res.data.tokens.access)
      localStorage.setItem("refresh_tokens", res.data.tokens.refresh)
      navigate("/dashboard/home")
      toast("Login Success")
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || "something went wrong")
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
        <div className="top-30 md:absolute left-80 rounded-lg bg-white p-8 shadow-lg">
          {/* Login form */}

          <div className="flex flex-col items-center justify-center p-8">
            <h3 className="font-roboto text-center text-3xl font-medium leading-[56.02px]">
              Log In
            </h3>
            <p className="text-center text-base font-normal leading-[16.8px] tracking-[0.17px] text-gray-500">
              Sign In to start your journey with us
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex w-[300px] flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Phone
                </label>
                <Input {...register("mobile", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                  placeholder="Enter your mobile No."
                  onKeyDown={(e) => {
                    const isNumeric = /^[0-9]$/.test(e.key);
                    const isBackspaceOrDelete = e.key === 'Backspace' || e.key === 'Delete';
                    if (!isNumeric && !isBackspaceOrDelete) {
                      e.preventDefault();
                    }
                  }} />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>Mobile number is required</p>
                )}
                {errors.mobile && errors.mobile.type === "minLength" && (
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
                  placeholder="Enter your Password"
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary self-end mt-2 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/changePassword")
                  }}
                >
                  Change Password 
                </label>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button type="submit" className="mt-4 w-[300px] rounded">
                  {
                    isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )
                  }
                  LOG IN
                </Button>
              </div>
            </form>
            {/* <Button variant="link" className="mt-4 w-[300px] rounded" onClick={() => {
              navigate("/signup")
            }}>
              SIGN UP
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
