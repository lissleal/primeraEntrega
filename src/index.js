import express from "express";
import ProductManager from "./controlers/ProductManager.js";

const product = new ProductManager();

const app = express()
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/products", async (req, res) => {
    res.send(await product.getProducts())
})

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    res.send(await product.getProductsById(id))
})

app.post("/products", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

app.put("/products", async (req, res) => {
    let id = parseInt(req.params.id)
    let updateProduct = req.body
    res.send(await product.updateProducts(id, updateProduct))
})

app.delete("/products/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    res.send(await product.deleteProducts(id))
})

app.listen(PORT, () =>
console.log(`Escuchando servidor en puerto ${PORT}`))