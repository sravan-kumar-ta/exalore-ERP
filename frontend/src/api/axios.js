import axios from "axios";

const BASE_URL = "http://192.168.56.10:8000/";

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

const refreshClient = axios.create({
   baseURL: BASE_URL,
});

const logout = () => {
   localStorage.removeItem("access_token");
   localStorage.removeItem("refresh_token");

   delete axiosInstance.defaults.headers.common.Authorization;

   window.location.replace("/authentication");
};

// Request Interceptor
axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
   },
   (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
   (response) => response,

   async (error) => {
      const originalRequest = error.config;

      if (!error.response) {
         return Promise.reject(error);
      }

      if (originalRequest?.skipInterceptor) {
         return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         const refreshToken = localStorage.getItem("refresh_token");

         if (!refreshToken) {
            logout();
            return Promise.reject(error);
         }

         try {
            console.log("Refreshing access token...");

            const { data } = await refreshClient.post("/auth/token/refresh/", {
               refresh: refreshToken,
            });

            const { access, refresh } = data;

            localStorage.setItem("access_token", access);

            if (refresh) {
               localStorage.setItem("refresh_token", refresh);
            }

            axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;

            originalRequest.headers.Authorization = `Bearer ${access}`;

            return axiosInstance(originalRequest);
         } catch (refreshError) {
            console.error("Refresh token expired.");
            logout();
            return Promise.reject(refreshError);
         }
      }
      return Promise.reject(error);
   },
);

export default axiosInstance;
