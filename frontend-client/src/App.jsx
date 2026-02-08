import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import AuthSelector_FromAdmin from "./pages/AuthSelector_FromAdmin";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import { AuthProvider } from "./context/AuthContext";


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}
//           {/* <Route path="/auth" element={<AuthSelector_FromAdmin />} /> */}
//           <Route path="/" element={<ProductDetails />} />
//           <Route path="/cart" element={<Cart />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// import Auth from "./pages/Auth";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import PrivateRoute from "./components/PrivateRoute";


// import ProductDetails from "./pages/ProductDetails";


// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Start app on Auth page */}
//           <Route path="/" element={<Navigate to="/auth" replace />} />

//           <Route path="/auth" element={<Auth />} />
//           <Route path="/products" element={<ProductDetails />} />

//           <Route
//             path="/cart"
//             element={
//               <PrivateRoute>
//                 <Cart />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <PrivateRoute>
//                 <Orders />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
