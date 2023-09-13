import {promises as fs} from "fs"
import {nanoid} from 'nanoid'

class ProductManager {
    constructor(){
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    existProducts = async (id) => {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }


    addProducts = async (product) => {
        let productsOld = await this.readProducts()
        product.id = Math.round(random()*1000);
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"
    }

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductsById = async (id) => {
        let productById = await this.existProducts(id)
        if(!productById) return "Producto no encontrado"
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.existProducts(id)
        await this.deleteProducts(id)
        let productUpdated = [{...product, id : id}]
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existProduct = products.some(prod => prod.id === id)
        if (existProduct){
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto Eliminado"
        }
        return "Producto a eliminar no existe"
        
    }
}

export default ProductManager


