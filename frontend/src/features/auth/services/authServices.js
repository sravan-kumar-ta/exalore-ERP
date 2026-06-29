import { configureAuth } from "react-query-auth";
import axiosInstance from "../../../api/axios";

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
   userFn: async () => {
      const { data } = await axiosInstance.get("/auth/user/");
      return data;
   },

   loginFn: async (credentials) => {
      console.log("credentials",credentials)
      const { data } = await axiosInstance.post("/auth/login/", credentials, {
         skipInterceptor: true,
      });

      const { access, refresh } = data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
   },

   registerFn: async (credentials) => {
      const { data } = await axiosInstance.post("/auth/register/", credentials);

      return data;
   },

   logoutFn: async () => {
      try {
         await axiosInstance.post("/auth/logout/", {
            refresh: localStorage.getItem("refresh_token"),
         });
      } catch (error) {
         console.error("Logout failed", error);
      } finally {
         localStorage.removeItem("access_token");
         localStorage.removeItem("refresh_token");
         console.log("Logout successfully.");

         window.location.href = "/authentication";
      }
   },
});
