import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const getcart = async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(200).json({
        status: true,
        cart: [],
      });
    }
    return res.status(200).json({
      status: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const addTocart = async (req, res) => {
  try {
    console.log("HITTTTTTT");
    const userId = req.id;
    const { productId } = req.body;

    //check if product exist
    const product = await Product.findById(productId);
    console.log("product", product);
    if (!product) {
      return res.status(400).json({
        status: false,
        message: "Product not Exist",
      });
    }

    //find the user cart (if exist)
    let cart = await Cart.findOne({ userId });

    console.log("cart", {
      userId,
      items: [{ productId, quantity: 1, price: product.productPrice }],
      totalPrice: product.productPrice,
    });

    //If User Cart didn't exist then create one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1, price: product.productPrice }],
        totalPrice: product.productPrice,
      });
    } else {
      //find if the product is already in the cart
      const Itemindex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (Itemindex > -1) {
        cart.items[Itemindex].quantity += 1;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
          price: product.productPrice,
        });
      }
      //Recalculate total Price

      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity);
    }

    //save updated cart
    await cart.save();

    //Populate product details before sending response
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");

    res.status(200).json({
      status: true,
      message: "Product added to Cart",
      cart: populatedCart,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: false,
      message: error.nessage,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    let cart = await cart.findOne({ userId });
    if (!cart) return res.status(404).json({ status: false, message: "Cart not found" });
    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ status: false, message: "Item not found" });
    if (type === "increase") item.quantity += 1;
    if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();
    cart = await cart.populate("items.productId");

    res.status(200).json({ status: true, cart });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart noot  found",
      });
    }

    cart.items = cart.items.filter((item) => useOptimistic.produuctId.toString() != productId);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({
      status: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
