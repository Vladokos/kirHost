const express = require("express");
const serviceController = require("../controllers/serviceController");
const serviceRouter = express.Router();

serviceRouter.get("/allService", serviceController.allService);
serviceRouter.get("/:id", serviceController.service);

module.exports = serviceRouter;


// app.get("/allService", async (req, res) => {
//     try {
//         const [data] = await promisePool.execute("SELECT * FROM `Services`");

//         for (let i = 0; i < data.length; i++) {
//             if (data[i]?.Image) {
//                 data[i].Image = "data:image/png;base64," + Buffer.from(data[i].Image).toString("base64")
//             }
//         }

//         res.render("allService.hbs", {
//             services: data
//         })

//     } catch (error) {
//         console.log(error);
//     }
// })

// app.get("/service/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         const [data] = await promisePool.execute("SELECT * FROM `Services` WHERE idServices = ?", [id]);

//         if (data[0]?.Image) {
//             data[0].Image = "data:image/png;base64," + Buffer.from(data[0].Image).toString("base64")
//         }

//         res.render("service.hbs", {
//             service: data[0]
//         })

//     } catch (error) {
//         console.log(error);
//     }
// })