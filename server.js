const express = require("express");
const app = express();
const cors = require("cors");
const hbs = require("hbs");


const userRouter = require("./routes/user.js")
const orderRouter = require("./routes/order.js");
const serviceRouter = require("./routes/service.js");
const tableRouter = require("./routes/table.js");


app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials/");



app.set("view engine", "hbs");


hbs.registerHelper("ifEquals", (arg1, arg2, options) => {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
})



app.use("/users", userRouter);
app.use("/order", orderRouter);
app.use("/service", serviceRouter)
app.use("/table", tableRouter)



app.listen(4000, () => {
    console.log("Server is running")
})