import { useState } from "react";
import { Boxes, ArrowRight } from "lucide-react";

import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthCard({ mode, setMode }) {
   const isLogin = mode === "login";

   const [loginForm, setLoginForm] = useState({
      username: "",
      password: "",
   });

   const [registerForm, setRegisterForm] = useState({
      username: "",
      email: "",
      password: "",
   });

   function handleLoginChange(e) {
      setLoginForm({
         ...loginForm,
         [e.target.name]: e.target.value,
      });
   }

   function handleRegisterChange(e) {
      setRegisterForm({
         ...registerForm,
         [e.target.name]: e.target.value,
      });
   }

   function handleSubmit(e) {
      e.preventDefault();

      if (isLogin) {
         console.log(loginForm);
      } else {
         console.log(registerForm);
      }
   }

   return (
      <div className="w-full max-w-md">
         {/* Mobile Logo */}
         <div className="flex lg:hidden items-center justify-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-lg bg-[#7c5cf0] flex items-center justify-center">
               <span className="text-white font-semibold">E</span>
            </div>

            <span className="text-[#171b2c] font-semibold text-lg">
               Exalore
            </span>
         </div>

         <div className="bg-white rounded-2xl border border-[#e7e8ee] shadow-sm p-8 sm:p-9">
            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#7c5cf0]/10 flex items-center justify-center mb-5">
               <Boxes className="w-5 h-5 text-[#7c5cf0]" strokeWidth={2} />
            </div>

            {/* Heading */}
            <h2 className="text-[#171b2c] text-xl font-semibold mb-1.5">
               {isLogin ? "Welcome back" : "Create your account"}
            </h2>

            <p className="text-[#80869a] text-sm mb-7">
               {isLogin
                  ? "Sign in to continue to your workspace"
                  : "Set up your workspace in under a minute"}
            </p>

            {/* Tabs */}
            <AuthTabs mode={mode} setMode={setMode} />

            {/* Form */}
            {isLogin ? <LoginForm /> : <RegisterForm setMode={setMode} />}

            {/* Footer */}
            <p className="text-center text-sm text-[#80869a] mt-6">
               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
               <button
                  type="button"
                  onClick={() => setMode(isLogin ? "register" : "login")}
                  className="text-[#7c5cf0] font-medium cursor-pointer"
               >
                  {isLogin ? "Sign up" : "Sign in"}
               </button>
            </p>
         </div>
      </div>
   );
}
