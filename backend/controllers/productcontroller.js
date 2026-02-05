import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const addProducts = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } = req.body;
    const userId = req.id;
    if (!productPrice || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        status: false,
        message: "All fields ar required",
      });
    }

    //handle multiple Img upload
    console.log("req.files=>", req.files);
    let productImg = [];
    if (req.files && req.files.length > 0) {
      console.log("This runs=>");
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products",
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    console.log("productImg=>", productImg);

    //create a product in DB
    const product = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg, //array of Objects [{url,puclic_id},{url,puclic_id}]
    });

    return res.status(200).json({
      status: true,
      mesage: "Product created Succcessfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (_, res) => {
  try {
    const allProduts = await Product.find({});
    if (!allProduts) {
      return res.status(200).json({
        status: false,
        message: "All Products are Empty",
        products: [],
      });
    }
    return res.status(200).json({
      status: true,
      message: "All Products",
      products: allProduts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.deleteOne({ _id: productId });
    if (!product) {
      return res.status(403).json({
        status: false,
        message: "No produt found by this Id",
      });
    }

    //delete image from cloudnary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, productDesc, productPrice, category, brand, existingImages } = req.body;
    console.log("productId=>", productId);
    const product = await Product.findById(productId);
    console.log("product", product);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    let updatedImages = [];

    if (existingImages) {
      const keepIds = JSON.parse(existingImages);
      updatedImages = product.productImg.filter((img) => keepIds.includes(img.public_id));

      //delete only removed images
      const removedImages = product.productImg.filter((img) => !keepIds.includes(img.public_id));

      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImages = product.productImg;
    }

    //uploade if new Img are provided
    if (req.files) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, { folder: "mern_products" });
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    //update product in DB
    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productImg = updatedImages;

    await product.save();

    return res.status(200).json({
      status: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
