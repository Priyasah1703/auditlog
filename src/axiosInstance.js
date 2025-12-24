import axios from "axios";

const api = axios.create({
  baseURL: "https://formatjsononline.com/api/json/get-audit-logs",
  baseURL:"https://formatjsononline.com/api/json/get-audit-logs",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
