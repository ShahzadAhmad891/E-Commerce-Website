import { useState } from "react";
import API from "../services/api"; // axios instance
import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../context/AuthContext";



const AuthSelector = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        // ============ ADMIN LOGIN ============
        const res = await API.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });

        // 🔐 STORE TOKEN
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", "user"); // optional but useful
        }

        setMessage("User login successful");
        console.log("User Login:", res.data);

        navigate("/products");
      } else {
        // ============ ADMIN REGISTER ============
        const res = await API.post("/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        // Optional: store token if backend sends it on register
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", "user");
        }

        setMessage("User registered successfully");
        console.log("User Register:", res.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h2>{isLogin ? "User Login" : "User Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="User Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin
          ? "New User? Register here"
          : "Already User? Login here"}
      </p>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthSelector;

// Below both Admin and client Logic
// import { useState } from "react";
// import axios from "axios";

// const AuthSelector = () => {
//   const [role, setRole] = useState(""); // "admin" or "user"
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const baseURL =
//       role === "admin"
//         ? "http://localhost:5000/api/admin"
//         : "http://localhost:5000/api/user";

//     // const payload =
//     //   isLogin
//     //     ? { email: formData.email, password: formData.password }
//     //     : formData;

//     const res = await axios.post(baseURL + endpoint, payload);


//     const endpoint = isLogin ? "/login" : "/register";

//     try {
//       const res = await axios.post(baseURL + endpoint, formData);

//       alert("Success!");
//       console.log(res.data);

//       // Save token
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", role);

//       if (role === "admin") {
//         window.location.href = "/admin-dashboard";
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Select Role</h2>

//       <button onClick={() => setRole("user")}>User</button>
//       <button onClick={() => setRole("admin")}>Admin</button>

//       {role && (
//         <>
//           <h3>{isLogin ? "Login" : "Register"} as {role}</h3>

//           <form onSubmit={handleSubmit}>
//             {!isLogin && (
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 onChange={handleChange}
//                 required
//               />
//             )}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//             />

//             <button type="submit">
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </form>

//           <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
//             {isLogin ? "Create an account" : "Already have an account?"}
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthSelector;
