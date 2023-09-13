import {promises as fs} from "fs"
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager()

class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
    }
    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    existCart = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCart = async () => {
        let cartsOld = await this.readCarts()
        let id = Math.round(Math.random()*1000);
        let cartConcat = [{id: id, products: []},...cartsOld]
        await this.writeCarts(cartConcat)
        return "Carrito Agregado"    }
    

    getCartsById = async (id) => {
        let cartById = await this.existCart(id)
        if(!cartById) return "Carrito no encontrado"
        return cartById
    }

    addProductInCart = async (idCart, idProd) => {
        let cartById = await this.existCart(idCart)
        if(!cartById) return "Carrito no encontrado"
        let productById = await productAll.existProducts(idProd)
        if(!cartById) return "Producto no encontrado"

        let cartAll = await this.readCarts()
        let cartFiltered = cartAll.filter(cart => cart.id != idCart)

        if(cartById.products.some(prod => prod.id === idProd)){
            let productInCart = cartById.products.find(prod => prod.id === idProd)
            productInCart.quantity++;
            let cartsConcat = [cartById, ...cartFiltered]
            await this.writeCarts(cartsConcat)
            return "Producto Sumado al Carrito" 
        }
        cartById.products.push({id: productById.id, quantity: 1 })
        let cartsConcat = [cartById, ...cartFiltered]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al Carrito"
    }
}

export default CartManager