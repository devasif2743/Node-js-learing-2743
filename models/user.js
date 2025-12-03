import express from "express";
import { DataTypes } from "sequelize";

import sequelize from "../config/dbconfig.js";


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {    
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

export default User;