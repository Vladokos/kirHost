const express = require("express");
const app = express();
const cors = require("cors");

const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: "bppppvfgvsskvuc87ysa-mysql.services.clever-cloud.com",
    user: "ueq7frirowmonxtz",
    database: "bppppvfgvsskvuc87ysa",
    password: "gJrysJIaW54CIHDfQnZh",
    port: "3306",
});

const promisePool = pool.promise();


app.get("/services", async (req, res) => {
    try {
        const [services] = await promisePool.execute("SELECT * FROM `Services`");

        res.send(services).status(200);
    } catch (error) {
        console.log(error);
    }
})

app.get("/service/:name", async (req, res) => {
    try {
        const { name } = req.params;

        const [service] = await promisePool.execute("SELECT * FROM `Services` WHERE Title = ?", [name.trim()])

        res.send(service).status(200);
    } catch (error) {
        console.log(error);
    }
})



app.listen(4000, () => {
    console.log("Server is running")
})