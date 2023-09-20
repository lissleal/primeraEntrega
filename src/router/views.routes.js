import express from "express";

const ViewsRouter = express.Router()

ViewsRouter.get("/realTimeProducts", (req, res)=>{
    res.render("home", {});
})

export default ViewsRouter