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
    let productImg = [];
    if (req.file && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products",
        });

        productImg.push({
          uri: result.secure_url,
          public_id: result.pucli_id,
        });
      }
    }

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
    const productId = req.params;
    const { productName, productDesc, productPrice, category, brand, existingImages } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.statas(404).json({
        status: false,
        message: "Product not found",
      });
    }

    const updatedImages = [];

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

    return res.status(200).json({
      status: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    return res.statas(500).json({
      status: false,
      message: error.message,
    });
  }
};
