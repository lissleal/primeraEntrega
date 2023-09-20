import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controlers/ProductManager.js";
import { Server } from "socket.io";
import ViewsRouter from "./router/views.routes.js";

//Creación de la aplicación Express y servidor HTTP:
const app = express()
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Escuchando servidor en puerto ${PORT}`))
const socketServer = new Server(httpServer)

const product = new ProductManager()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Configuración de rutas estáticas y de vistas:
app.use("/", express.static(__dirname + "/public"))
app.use("/", ViewsRouter)

//Configuración de eventos WebSocket:
socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado")
    socket.on("message", data => {
        console.log(data)
    })

    socket.emit("evento_para_socket_individual","Este mensaje solo lo debe recibir el socket")

    socket.broadcast.emit("evento_para_todos_menos_el_socket_actual","Este evento lo veran todos los sockets conectaods menos el socket actual desde el que se envio el mensaje")

    socketServer.emit("evento_para_todos", "Este mensaje lo reciben todos los sockets conectados")
})

//Rutas GET para la página de inicio y detalles del producto:
app.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
    title: "Express Avanzado | Handlebars",
    products: allProducts
    })
})

app.get("/:id", async (req, res) => {

    let prod = await product.getProductsById(parseInt(req.params.id))
    res.render("prod", {
    title: "Express Avanzado | Handlebars",
    products: prod
    })
})


//Rutas para API de productos y carritos:
app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)


