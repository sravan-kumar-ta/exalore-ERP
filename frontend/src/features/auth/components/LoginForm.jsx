import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react";
import AuthField from "./AuthField";
import { useLogin } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
   const [showPassword, setShowPassword] = useState(false);
   const login = useLogin();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors, isSubmitting },
   } = useForm({
      defaultValues: {
         username: "",
         password: "",
      },
   });

   const onSubmit = (data) => {
      login.mutate(data, {
         onSuccess: () => {
            toast.success("Successfully loggedin.");
            navigate("/dashboard");
         },

         onError: (error) => {
            const detail = error.response?.data?.detail;

            setError("root", {
               type: "server",
               message: detail || "Invalid username or password.",
            });
         },
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <AuthField
            label="Username"
            icon={User}
            placeholder="Enter your username"
            error={errors.username?.message}
            {...register("username", {
               required: "Username is required",
            })}
         />

         <AuthField
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Enter your password"
            error={errors.password?.message}
            trailingIcon={showPassword ? EyeOff : Eye}
            onTrailingClick={() => setShowPassword((prev) => !prev)}
            {...register("password", {
               required: "Password is required",
            })}
         />
         {errors.root && (
            <p className="text-sm text-red-500 text-center">
               {errors.root.message}
            </p>
         )}
         <button
            type="submit"
            className="w-full mt-2 bg-[#7c5cf0] hover:bg-[#6a4ce0] active:scale-[0.99] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all cursor-pointer"
         >
            Sign In
            <ArrowRight className="w-4 h-4" />
         </button>
      </form>
   );
}
