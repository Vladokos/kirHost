const express = require("express");
const app = express();
const cors = require("cors");
const hbs = require("hbs");
const db = require("./util/database");

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
    if (arg2 === "primaryKey") {
        return (arg1 === options.data.root.primaryKey) ? options.fn(this) : options.inverse(this);
    }
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
})

hbs.registerHelper("ifMore", (arg1, arg2, options) => {
    return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
})

//look inside object and get keys from it
//return like keyValue1,keyValue2
hbs.registerHelper("search", (arg1, arg2, options) => {
    // console.log(Object.keys(arg1).join(","));
    return Object.keys(arg1)
})




app.use("/users", userRouter);
app.use("/order", orderRouter);
app.use("/service", serviceRouter)
app.use("/table", tableRouter)


app.get("/", async (req, res) => {
    try {

        const [data] = await db.execute("select * from `Services` limit 4");

        for (let i = 0; i < data.length; i++) {
            if (data[i]?.Image) {
                data[i].Image = "data:image/png;base64," + Buffer.from(data[i].Image).toString("base64")
            }
        }

        res.render("index.hbs", {
            service: data
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


app.listen(4000, () => {
    console.log("Server is running")
})