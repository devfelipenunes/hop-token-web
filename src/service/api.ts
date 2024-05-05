import axios from "axios";
import { parseCookies } from "nookies";

// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://api.clubedeferias.com/api"
//     : "https://dev-api.clubedeferias.com/api";

const baseURL = "https://vailer.froesmhs.com/api";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies();
  const cdfToken = cookies.cdf_token;

  if (cdfToken) config.headers.Authorization = `Bearer ${cdfToken}`;

  return config;
});

export default api;
