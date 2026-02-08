import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;

// // ============ Admin Register =============
// API.post("/register", {
//   name,
//   email,
//   password,
// });

// // ============ Admin Login =============
// API.post("/login", {
//   email,
//   password,
// });


// // ============ Calls =============
// POST /api/admin/register
// POST /api/admin/login








// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// instance.interceptors.request.use((config) => {
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   if (auth?.token) {
//     config.headers.Authorization = `Bearer ${auth.token}`;
//   }
//   return config;
// });

// export default instance;
