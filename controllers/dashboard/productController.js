import Product from "../../models/Product.js";
import { validationResult } from "express-validator";

export const addProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: false, message: errors.array()[0].msg });
  }

  const { productname, amount } = req.body;

  try {
    const result = await Product.create({
      productname,
      amount,
    });
    if (result) {
      return res.status(200).json({ status: true, message: "Produt added" });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Produt Not added" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

export const getProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: false, message: errors.array()[0].msg });
  }

  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    return res.status(200).json({ status: true, product: product });
  } catch (error) {}
};

export const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const result = await Product.findAndCountAll({
      limit,
      offset,
    });

    const totalProducts = result.count; // 👈 total products
    const totalPages = Math.ceil(totalProducts / limit); // 👈 total pages

    return res.json({
      status: true,
      data: result.rows,
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: false, message: errors.array()[0].msg });
  }

  const productId = req.params.id;
  const updateDatass = req.body;

  try {
    const result = await Product.findByPk(productId);
    if (!result) {
      res.status(404).json({ status: false, message: "No Data Found" });
    }

    const update = result.update(updateDatass);

    if (!update) {
      res.status(500).json({ status: false, message: "No Updated" });
    }

    res.status(200).json({ status: true, message: "Product Updated" });
  } catch (error) {
    res.status(500).json({ status: false, message: "dfsdfsdfsdfsdfsdf" });
  }
};

export const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: false, message: errors.array()[0].msg });
  }

  try {
    const productId = req.params.id;

    const deleted = await Product.destroy({
      where: { id: productId },
    });

    if (deleted === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const addImage=async(req,res)=>{
const id=req.params.id;

try {
  const exist=await Product.findByPk(id);
  if(!exist){
    return res.status(404).json({status:false,message:"No Product Found"});
  }  

   if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const imagePath = "/uploads/" + req.file.filename;
      await exist.update({ image: imagePath });

     res.json({
      message: "Image uploaded successfully",
      image: imagePath
    });
  

} catch (error) {
   res.status(500).json({ error: error.message });
}

}
