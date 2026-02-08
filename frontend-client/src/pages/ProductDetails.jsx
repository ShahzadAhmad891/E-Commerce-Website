import { useEffect, useState } from "react";
// import axios from "axios";
import API from "../services/api";
import { useNavigate } from "react-router-dom";



const BACKEND_BASE_URL = "http://localhost:5000";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading_1, setLoading_1] = useState(false);
  const navigate = useNavigate();   // 👈 add this


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // const res = await axios.get(`${BACKEND_BASE_URL}/api/products`);
      // const res = await API.get(`${BACKEND_BASE_URL}/api/products`);
      const res = await API.get("/products");

      const productData = Array.isArray(res.data)
        ? res.data
        : res.data.products || res.data.data || [];
      setProducts(productData);
    } catch (err) {
      console.error("Product fetch error:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/200x150?text=No+Image";
    const imageName = imagePath.split('/').pop();
    return `${BACKEND_BASE_URL}/uploads/products/${imageName}`;
  };

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}>{error}</h2>;

  // Below Logic for Add to Cart button functionality



  const addToCart = async (productId) => {
  try {
    const res = await API.post("/cart/add", {
      productId,
      quantity: 1,
    });

    alert("Product added to cart");
    console.log("Cart response:", res.data);
  } catch (err) {
    console.error("Add to cart error:", err);
    alert("Failed to add to cart");
  }
};




return (
  // <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
  // <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Our Products - Shahzad Ahmad</h1>



  <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>

    {/* Top bar */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h1 style={{ margin: 0 }}>Our Products - Shahzad Ahmad</h1>

      <button
        onClick={() => navigate("/cart")}
        style={{
          padding: "10px 18px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🛒 Go to Cart
      </button>
    </div>

    {products.length === 0 ? (
      <h3 style={{ textAlign: "center" }}>No products found</h3>
    ) : (
      <div
        style={{
          display: "flex",       // Sets up the flex container
          flexWrap: "wrap",      // Allows items to move to the next row
          gap: "20px",           // Space between cards
          justifyContent: "center" // Centers items in the row
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              // Flex-basis determines the size of each card (approx 3 per row on desktop)
              flex: "1 1 280px",
              maxWidth: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img
                src={getImageSrc(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/200x150?text=No+Image";
                }}
                style={{
                  // maxWidth: "100%",    // Ensures it never exceeds the card width
                  maxWidth: "300px",
                  height: "150px",     // Reduced height as requested
                  // objectFit: "contain", // Keeps image proportions without cropping
                  borderRadius: "8px",
                }}
              />
            </div>

            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{product.name}</h3>
              <p style={{ fontSize: "13px", color: "#555", height: "40px", overflow: "hidden" }}>
                {product.description}
              </p>
              <p style={{ margin: "5px 0" }}><strong>Price:</strong> Rs. {product.price}</p>
              <p style={{ margin: "5px 0" }}><strong>Stock:</strong> {product.quantity}</p>
            </div>


            <button
              onClick={() => addToCart(product._id)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px",
                background: "#ce1f13",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>

            {/* <button onClick={addToCart} disabled={loading_1}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "15px",
                  background: "#ce1f13",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              > */}
            {/* {loading_1 ? "Adding..." : "Add to Cart"} */}
            {/* </button> */}
          </div>
        ))}
      </div>
    )
    }
  </div >
);
};

export default ProductDetails;