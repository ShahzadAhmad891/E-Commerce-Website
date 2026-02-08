import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Products: {stats.totalProducts}</p>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Orders: {stats.totalOrders}</p>
      <p>Total Revenue: PKR {stats.totalRevenue}</p>
    </div>
  );
}
