import { body, query, param } from "express-validator";
import User from "../models/user.js";
import Product from "../models/Product.js";

export const RegisterValidator = [
  body("name").notEmpty().withMessage("name field required"),
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (val) => {
      const user = await User.findOne({ where: { email: val } });
      if (user) {
        throw new Error("Email id Already Exists");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6, max: 12 }),
];

export const LoginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (val) => {
      const user = await User.findOne({ where: { email: val } });
      if (!user) {
        throw new Error("Invalid Email Id");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6, max: 12 }),
];

export const ProductAdding = [
  body("productname").notEmpty().withMessage("Product Name required"),

  body("amount")
    .notEmpty()
    .withMessage("Amount required")
    .isNumeric()
    .withMessage("Only Number Allowed")
    .isFloat({ min: 10, max: 999 }),
];

export const getProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product Id required")
    .custom(async (val) => {
      const product = await Product.findOne({ where: { id: val } });
      if (!product) {
        throw new Error("Invalid Product id / No Product Found");
      }

      return true;
    }),
];

export const ProductupdatingValidator = [
  body("productname").notEmpty().withMessage("Product Name required"),

  body("amount")
    .notEmpty()
    .withMessage("Amount required")
    .isNumeric()
    .withMessage("Only Number Allowed")
    .isFloat({ min: 10, max: 999 }),
];

export const ProductdeleteValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product Id  required")
    .custom(async (val) => {
      const exists = await Product.findByPk(val);
      if (!exists) {
        throw new Error("Product id Not Found");
      }
      return true;
    }),
];
