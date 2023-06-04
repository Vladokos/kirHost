const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();



userRouter.get("/registration", userController.registration);
userRouter.get("/login", userController.login);
userRouter.get("/profile/:email", userController.profile);
userRouter.post("/enterUser", userController.enterUser);
userRouter.post("/createUser", userController.createUser);



module.exports = userRouter;

// router.get("/registration", async (req, res) => {
//     try {
//         res.render("registration.hbs");
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.get("/login", async (req, res) => {
//     try {
//         res.render("login.hbs")
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.get("/profile/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (id === "null") {
//             res.redirect("/registration")
//         } else {
//             const [user] = await promisePool.execute("SELECT * FROM `users` WHERE `Email` = ?", [id]);
//             res.render("profile.hbs", {
//                 user
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.post("/enterUser", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const [user] = await promisePool.execute("SELECT * FROM `users` WHERE email = ?", [email]);

//         if (user.length > 0) {

//             res.sendStatus(200);
//         }
//     } catch (error) {

//     }
// })

// app.post("/createUser", async (req, res) => {
//     try {
//         const { login, email, password } = req.body;

//         const [duplicateUser] = await promisePool.execute("SELECT * FROM `users` WHERE `Email` = ?", [email]);

//         if (duplicateUser.length === 0) {
//             const [user] = await promisePool.execute("INSERT INTO `users` (`login`, `email`, `password`) VALUES (?,?,?)", [login, email, password]);
//             res.sendStatus(200);
//         }
//         else {
//             res.render(500);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });