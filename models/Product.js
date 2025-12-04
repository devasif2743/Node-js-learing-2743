import express from "express";
import { DataTypes } from "sequelize";

import sequelize from "../config/dbconfig.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Products",
    timestamps: false,
  }
);

export default Product;
