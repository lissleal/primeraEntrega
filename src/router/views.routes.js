import express from "express";
import ProductManager from "../controlers/ProductManager.js";

const ViewsRouter = express.Router()
const product = new ProductManager()

//Rutas GET para la página de inicio y detalles del producto:
ViewsRouter.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
    title: "Express Avanzado | Handlebars",
    products: allProducts
    })
})

ViewsRouter.get("/realTimeProducts", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("realTimeProducts", {
    title: "Express Avanzado | Handlebars",
    products: allProducts
    })
})

ViewsRouter.get("/:id", async (req, res) => {

    let prod = await product.getProductsById(parseInt(req.params.id))
    res.render("prod", {
    title: "Express Avanzado | Handlebars",
    products: prod
    })
})

export default ViewsRouter