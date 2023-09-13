import {promises as fs} from "fs"

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
        product.id = Math.round(Math.random()*1000);
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"
    }

    getProducts = async (limit) => {
        let productsOld = await this.readProducts()
        if (!limit) return productsOld
        if(productsOld.length === 0) return "Error no se encontraron productos que cumplan con el criterio"
        if (productsOld && limit) return productsOld.slice(0, limit)
    }

    getProductsById = async (id) => {
        let productById = await this.existProducts(id)
        if(!productById) return "Producto no encontrado"
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.existProducts(id)
        if (!productById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productsOld = await this.readProducts()
        let productsNew = [{...product, id : id}, ...productsOld]
        await this.writeProducts(productsNew)
        return "Producto Actualizado"
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


