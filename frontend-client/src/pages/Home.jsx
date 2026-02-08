import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="products">
      {products.map((p) => (
        <div key={p._id} className="card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>PKR {p.price}</p>
        </div>
      ))}
    </div>
  );
}
