import express from "express";

const ViewsRouter = express.Router()

ViewsRouter.get("/realTimeProducts", (req, res)=>{
    res.render("realTimeProducts");
})

export default ViewsRouter