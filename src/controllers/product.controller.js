import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    // console.log(products);
    res.render("index", { products: products });
  }

  getAddForm(req, res) {
    res.render("new-products", { errorMessage: null });
  }

  addNewProduct(req, res) {
    // access data from form.
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("index", { products: products });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send("Product not Found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    var products = ProductModel.get();
    res.render("index", { products: products });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    var products = ProductModel.get();
    res.status(200).render("index", { products });
  }
}
