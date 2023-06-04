const Services = require("../models/serviceModel");

exports.allService = async (req, res) => {
    try {
        const services = new Services();
        const data = await services.selectAll();

        res.render("allService.hbs", {
            services: data
        })
    } catch (error) {
        console.log(error);

        res.sendStatus(500);

    }
}

exports.service = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const service = new Services(id);
        const data = await service.select();

        res.render("service.hbs", {
            service: data[0]
        })
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}


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