import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import ejsLayout from "express-ejs-layouts";
import path from "path";
import validationMiddleware from "./src/middlewares/validation.middleware.js";

const server = express();

// accessing public folder
server.use(express.static("public"));

// parse form data
server.use(express.urlencoded({ extended: true }));

// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// using ejslayout
server.use(ejsLayout);

// create an instance of ProductController
// gets
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.get("/update-product/:id", productController.getUpdateProductView);

// posts
server.post("/", validationMiddleware, productController.addNewProduct);
server.post("/delete-product/:id", productController.deleteProduct);
server.post("/update-product", productController.postUpdateProduct);

server.use(express.static("src/views"));

server.listen(3400);

console.log("Listening to 3400 !!");
