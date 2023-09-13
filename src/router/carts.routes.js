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
CartRouter.get("/:cid", async (req, res) => {
    let id = parseInt(req.params.cid)
    res.send(await carts.getCartsById(id))
})
CartRouter.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    res.send(await carts.addProductInCart(cartId,productId))
})

export default CartRouter