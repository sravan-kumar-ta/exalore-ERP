import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRegister } from "../services/authServices";

import AuthField from "./AuthField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const fieldMessages = {
   username: "Username is already taken.",
   email: "Email is already registered.",
};

export default function RegisterForm({ setMode }) {
   const [showPassword, setShowPassword] = useState(false);

   const registerMutation = useRegister();

   const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         first_name: "",
         username: "",
         email: "",
         password: "",
      },
   });

   const onSubmit = (data) => {
      registerMutation.mutate(data, {
         onSuccess: () => {
            toast.success("Account created successfully.");
            reset();
            setMode("login");
         },

         onError: (error) => {
            const errors = error.response?.data;

            Object.entries(errors).forEach(([field, messages]) => {
               setError(field, {
                  type: "server",
                  message:
                     fieldMessages[field] ??
                     (Array.isArray(messages) ? messages[0] : messages),
               });
            });
         },
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <AuthField
            label="Name"
            icon={User}
            placeholder="Enter your name"
            error={errors.first_name?.message}
            {...register("first_name", {
               required: "Name is required",
            })}
         />

         <AuthField
            label="Username"
            icon={User}
            placeholder="Choose a username"
            error={errors.username?.message}
            {...register("username", {
               required: "Username is required",
               minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
               },
            })}
         />

         <AuthField
            label="Email"
            type="email"
            icon={Mail}
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
               required: "Email is required",
               pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
               },
            })}
         />

         <AuthField
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Create a password"
            error={errors.password?.message}
            trailingIcon={showPassword ? EyeOff : Eye}
            onTrailingClick={() => setShowPassword((prev) => !prev)}
            {...register("password", {
               required: "Password is required",
               minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
               },
            })}
         />

         <button
            type="submit"
            className="w-full mt-2 bg-[#7c5cf0] hover:bg-[#6a4ce0] active:scale-[0.99] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all cursor-pointer"
         >
            Create Account
            <ArrowRight className="w-4 h-4" />
         </button>
      </form>
   );
}
