import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(res.data);
    } catch (error) {
      alert("Unauthorized or session expired");
      handleLogout();
    }
  };

  // ================= BUTTON HANDLERS =================

  const handleAddProduct = () => {
    navigate("/admin/add-product");

  };

  const handleManageOrders = () => {
    navigate("/admin/orders");
  };

  const handleViewPayments = () => {
    navigate("/admin/payments");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard - Shahzad</h1>

      <div>
        <h3>Total Users: {stats.totalUsers}</h3>
        <h3>Total Products: {stats.totalProducts}</h3>
        <h3>Total Orders: {stats.totalOrders}</h3>
        <h3>Total Revenue: Rs. {stats.totalRevenue}</h3>
      </div>

      <hr />

      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleManageOrders}>Manage Orders</button>
      <button onClick={handleViewPayments}>View Payments</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({});

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/admin/dashboard",
//          {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStats(res.data);
//     } catch (error) {
//       alert("Unauthorized or session expired");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Admin Dashboard - Shahzad</h1>

//       <div>
//         <h3>Total Users: {stats.totalUsers}</h3>
//         <h3>Total Products: {stats.totalProducts}</h3>
//         <h3>Total Orders: {stats.totalOrders}</h3>
//         <h3>Total Revenue: Rs. {stats.totalRevenue}</h3>
//       </div>

//       <hr />

//       <button>Add Product</button>
//       <button>Manage Orders</button>
//       <button>View Payments</button>
//       <button>Logout</button>
//     </div>
//   );
// };

// export default AdminDashboard;
