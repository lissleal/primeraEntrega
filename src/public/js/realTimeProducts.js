const socket = io();

const message = "Hola, me estoy comunicando desde un websocket"
socket.emit("product", message)

document.getElementById("productsForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const productData = {};

    formData.forEach((value, key) => {
        productData[key] = value;
    });

    socket.emit('addProduct', productData)
    e.target.reset();
})

socket.on("productAdded", (product) => {
    const newElement = document.createElement("tr")
    newElement.innerHTML = `
    <td>${product.title}</td>
    <td> ${product.id} </td>
    <td> ${product.description} </td>
    <td> ${product.price} </td>
    <td> ${product.category} </td>
    <td> ${product.stock} </td>
    <td>     <img src="${product.thumbnails}" alt=""> </td>

    `
    const realTimeProducts = document.getElementById("realTimeProducts")
    realTimeProducts.appendChild(newElement)
})
