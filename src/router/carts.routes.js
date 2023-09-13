import { Router } from "express";
import CartManager from "../controlers/CartManager.js";

const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCart())
})
CartRouter.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})
CartRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    res.send(await carts.getCartsById(id))
})
CartRouter.post("/:idCart/products/:idProd", async (req, res) => {
    let cartId = parseInt(req.params.idCart)
    let productId = parseInt(req.params.idProd)
    res.send(await carts.addProductInCart(cartId,productId))
})

export default CartRouter