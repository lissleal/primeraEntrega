import { Router } from "express";

import ProductManager from "../controlers/ProductManager.js";

const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit)
    res.send(await product.getProducts(limit))
})

ProductRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid)
    res.send(await product.getProductsById(id))
})

ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

ProductRouter.put("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid)
    let updateProduct = req.body
    res.send(await product.updateProducts(id, updateProduct))
})

ProductRouter.delete("/:pid", async (req,res) => {
    let id = parseInt(req.params.pid)
    res.send(await product.deleteProducts(id))
})

export default ProductRouter