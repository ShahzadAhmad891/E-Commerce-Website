// backend/controllers/cartController.js

import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!req.session.cart) {
      req.session.cart = { items: [], totalPrice: 0 };
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = req.session.cart;
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        price: product.price,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json(cart);
  } catch (err) {
    console.error("AddToCart Error:", err);
    res.status(500).json({ message: err.message });
  }

};

export const getCart = async (req, res) => {
  if (!req.session.cart) {
    return res.json({ items: [], totalPrice: 0 });
  }

  const populatedItems = await Promise.all(
    req.session.cart.items.map(async (item) => {
      const product = await Product.findById(item.product);
      return {
        ...item,
        product,
      };
    })
  );

  res.json({
    items: populatedItems,
    totalPrice: req.session.cart.totalPrice,
  });
};

// export const getCart = (req, res) => {
//   res.json(req.session.cart || { items: [], totalPrice: 0 });
// };

// export const updateCart = async (req, res) => {
export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = req.session.cart;
  if (!cart) return res.status(400).json({ message: "Cart empty" });

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  res.json(cart);
};

export const removeFromCart = (req, res) => {
  const { productId } = req.params;

  const cart = req.session.cart;
  if (!cart) return res.status(400).json({ message: "Cart empty" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  res.json(cart);
};



// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

// /* ================= ADD TO CART ================= */
// export const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const product = await Product.findById(productId);

//   if (!product)
//     return res.status(404).json({ message: "Product not found" });

//   let cart = await Cart.findOne({ user: req.user._id });

//   if (!cart) {
//     cart = await Cart.create({
//       user: req.user._id,
//       items: [],
//       totalPrice: 0,
//     });
//   }

//   const itemIndex = cart.items.findIndex(
//     (i) => i.product.toString() === productId
//   );

//   if (itemIndex > -1) {
//     cart.items[itemIndex].quantity += quantity;
//   } else {
//     cart.items.push({
//       product: productId,
//       quantity,
//       price: product.price,
//     });
//   }

//   cart.totalPrice = cart.items.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );

//   await cart.save();
//   res.json(cart);
// };

// /* ================= GET CART ================= */
// export const getCart = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id }).populate(
//     "items.product",
//     "name price image"
//   );

//   res.json(cart || { items: [], totalPrice: 0 });
// };

// /* ================= UPDATE QUANTITY ================= */
// export const updateQuantity = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const cart = await Cart.findOne({ user: req.user._id });

//   const item = cart.items.find(
//     (i) => i.product.toString() === productId
//   );

//   if (!item)
//     return res.status(404).json({ message: "Item not found in cart" });

//   item.quantity = quantity;

//   cart.totalPrice = cart.items.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );

//   await cart.save();
//   res.json(cart);
// };

// /* ================= REMOVE ITEM ================= */
// export const removeFromCart = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id });

//   cart.items = cart.items.filter(
//     (i) => i.product.toString() !== req.params.productId
//   );

//   cart.totalPrice = cart.items.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );

//   await cart.save();
//   res.json(cart);
// };
