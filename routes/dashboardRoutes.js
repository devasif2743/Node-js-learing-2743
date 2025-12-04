import express from "express";
import {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  addImage
} from "../controllers/dashboard/productController.js";
import tokenAuth from "../middleware/tokenAuth.js";
import {
  ProductAdding,
  getProductValidator,
  ProductupdatingValidator,
  ProductdeleteValidator,
} from "../Validators/registerValidator.js";
import { upload } from "../middleware/upload.js";
export const dashboardRouter = express.Router();

dashboardRouter.post("/add-product", tokenAuth, ProductAdding, addProduct);
dashboardRouter.get("/product/:id", tokenAuth, getProductValidator, getProduct);
dashboardRouter.get("/all-products", tokenAuth, getAllProduct);
dashboardRouter.post(
  "/updat-product/:id",
  tokenAuth,
  ProductupdatingValidator,
  updateProduct
);

dashboardRouter.delete(
  "/delete-products/:id",
  tokenAuth,
  ProductdeleteValidator,
  deleteProduct
);

dashboardRouter.post("/add-image/:id",tokenAuth, upload.single("image"),addImage);
