import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if needed
  withCredentials: true

});

// 🔐 Attach token to EVERY request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // adjust if needed
// });




// // Attach token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // or "authToken"
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;





// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default API;






// POST /api/user/register
// POST /api/user/login



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;



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
