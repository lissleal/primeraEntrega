import express from "express";
import ProductManager from "../controlers/ProductManager.js";

const ViewsRouter = express.Router()
const product = new ProductManager()

ViewsRouter.get("/realTimeProducts", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("realTimeProducts", {
        title: "Express Avanzado | Handlebars",
        oldProducts: allProducts
    })
})

export default ViewsRouter