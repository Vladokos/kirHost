const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();



orderRouter.post("/leaveOrder", orderController.leaveOrder);
orderRouter.post("/leaveOrder/:id", orderController.leaveOrder);



module.exports = orderRouter;


// app.post("/leaveOrder", async (req, res) => {
    //     try {
//         const { email, login } = req.body;

    //         const [duplicateUser] = await promisePool.execute("SELECT * FROM `users` WHERE `email` = ?", [email]);
    //         const [service] = await promisePool.execute("select * from `Services` limit 1");
    
    
    //         var dt = dateTime.create();
    //         var formatted = dt.format('Y-m-d H:M:S');
    //         if (duplicateUser.length === 0) {
    //             const [user] = await promisePool.execute("INSERT INTO `users` (`login`, `email`, `password`) VALUES (?,?,?)", [login, email, password]);
    
    //             await promisePool.execute("INSERT INTO `Order` (`idUser`, `idService`, `Date`) VALUES (?, ?, ?)", [user[0].insertId, service[0].idServices, formatted])
    
    //             res.sendStatus(200);
    //         }
    //         else {
    
    //             await promisePool.execute("INSERT INTO `Order` (`idUser`, `idService`, `Date`) VALUES (?, ?, ?)", [duplicateUser[0].idusers, service[0].idServices, formatted])
    
    //             res.sendStatus(200);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
    
    
    // app.post("/leaveOrder/:id", async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { email, login } = req.body;
    
    //         const [duplicateUser] = await promisePool.execute("SELECT * FROM `users` WHERE `email` = ?", [email]);
    //         const [service] = await promisePool.execute("select * from `Services` where `idServices` = ?", [id]);
    
    
    //         var dt = dateTime.create();
    //         var formatted = dt.format('Y-m-d H:M:S');
    //         if (duplicateUser.length === 0) {
    //             const [user] = await promisePool.execute("INSERT INTO `users` (`login`, `email`, `password`) VALUES (?,?,?)", [login, email, password]);
    
    //             await promisePool.execute("INSERT INTO `Order` (`idUser`, `idService`, `Date`) VALUES (?, ?, ?)", [user[0].insertId, service[0].idServices, formatted])
    
    //             res.sendStatus(200);
    //         }
    //         else {
    
    //             await promisePool.execute("INSERT INTO `Order` (`idUser`, `idService`, `Date`) VALUES (?, ?, ?)", [duplicateUser[0].idusers, service[0].idServices, formatted])
    
    //             res.sendStatus(200);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })