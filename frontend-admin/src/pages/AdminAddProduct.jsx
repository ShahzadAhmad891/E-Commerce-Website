import { useState } from "react";
import axios from "axios";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: ""
  });

  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/products",   // 🔴 use your API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Product added successfully");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Product</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />

        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <br />

        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;


// import { useState } from "react";
// import axios from "axios";

// const AdminAddProduct = () => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     quantity: "",
//   });
//   const [image, setImage] = useState(null);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(form).forEach((key) =>
//       formData.append(key, form[key])
//     );
//     formData.append("image", image);


//     await axios.post("http://localhost:5000/api/products", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("Product added successfully");
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
//       <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
//       <input placeholder="Quantity" onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
//       <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
//       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//       <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default AdminAddProduct;
