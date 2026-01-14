import axios from "axios";

const api = axios.create({
  baseURL: "https://formatjsononline.com/api/json/get-audit-logs",
  baseURL: "https://formatjsononline.com/api/json/get-audit-logs",
  baseURL: "https://formatjsononline.com/api/json/cb-reports-pie-chart",
  baseURL: "https://formatjsononline.com/api/json/cb-reports-bar-chart",
  baseURL: "https://formatjsononline.com/api/json/cb-reports-stats",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
