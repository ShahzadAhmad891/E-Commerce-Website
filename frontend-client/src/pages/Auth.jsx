import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isLogin ? "/user/login" : "/user/register";

      const payload = isLogin
        ? {
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
          };

      const res = await API.post(endpoint, payload);

      /*
        Expected response:
        {
          token,
          user: { _id, name, email, role }
        }
      */

      /* 🔐 ALWAYS STORE TOKEN WHEN RECEIVED */
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      /* 🌍 UPDATE GLOBAL AUTH STATE */
      login({
        token: res.data.token,
        user: res.data.user,
      });

      setMessage(isLogin ? "Login successful" : "Registration successful");

      /* 🚦 ROLE-BASED NAVIGATION */
      if (res.data.user?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/products");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Authentication failed"
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
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
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

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer", marginTop: "10px" }}
      >
        {isLogin
          ? "New user? Register here"
          : "Already have an account? Login"}
      </p>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;




// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const resetForm = () => {
//     setName("");
//     setEmail("");
//     setPassword("");
//   };

//   const toggleAuthMode = () => {
//     setIsLogin((prev) => !prev);
//     resetForm();
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const endpoint = isLogin ? "/user/login" : "/user/register";

//       const payload = isLogin
//         ? {
//             email: email.toLowerCase().trim(),
//             password,
//           }
//         : {
//             name,
//             email: email.toLowerCase().trim(),
//             password,
//           };

//       const { data } = await API.post(endpoint, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       /*
//         Expected backend response:
//         {
//           token: "jwt_here",
//           user: {
//             _id,
//             name,
//             email,
//             role: "admin" | "user"
//           }
//         }
//       */

//       // 🔐 Store token
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       // 👤 Store user (with role)
//       if (data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }

//       // 🌍 Update global auth state
//       login({
//         token: data.token,
//         user: data.user,
//       });

//       // 🚦 Role-based navigation
//       if (data.user?.role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/products");
//       }
//     } catch (error) {
//       console.error(error.response?.data);
//       alert(error.response?.data?.message || "Authentication failed");
//     }
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <h2>{isLogin ? "User Login" : "User Register"}</h2>

//       {!isLogin && (
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       )}

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button type="submit">
//         {isLogin ? "Login" : "Register"}
//       </button>

//       <button
//         type="button"
//         onClick={toggleAuthMode}
//         style={{
//           marginTop: "10px",
//           background: "#eee",
//           cursor: "pointer",
//         }}
//       >
//         Switch to {isLogin ? "Register" : "Login"}
//       </button>
//     </form>
//   );
// };

// export default Auth;


// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// const Auth = () => {
//     const [isLogin, setIsLogin] = useState(true); // toggle
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();


//     const submitHandler = async (e) => {
//         e.preventDefault();

//         try {
//             const endpoint = isLogin ? "/user/login" : "/user/register";

//             const payload = isLogin
//                 ? {
//                     email: email.toLowerCase().trim(),
//                     password,
//                 }
//                 : {
//                     name,
//                     email: email.toLowerCase().trim(),
//                     password,
//                 };

//             const { data } = await API.post(
//                 endpoint,
//                 payload,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             login(data);
//             // navigate("/"); 
//             navigate("/products");

//         } catch (error) {
//             console.error(error.response?.data);
//             alert(error.response?.data?.message || "Authentication failed");
//         }
//     };

    
//     return (
//         <form onSubmit={submitHandler}>
//             <h2>{isLogin ? "Login" : "Register"}</h2>

//             {!isLogin && (
//                 <input
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             )}

//             <input
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />

//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />

//             <button type="submit">
//                 {isLogin ? "Login" : "Register"}
//             </button>

//             <p style={{ cursor: "pointer", marginTop: "10px" }}>
//                 {isLogin ? "New user?" : "Already have an account?"}{" "}
//                 <span
//                     onClick={() => setIsLogin(!isLogin)}
//                     style={{ color: "blue" }}
//                 >
//                     {isLogin ? "Register" : "Login"}
//                 </span>
//             </p>
//         </form>
//     );
// };

// export default Auth;
