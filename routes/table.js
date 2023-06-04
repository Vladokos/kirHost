const express = require("express");
const tableController = require("../controllers/tableController");
const tableRouter = express.Router();


tableRouter.get("/tablesName", tableController.selectTablesName);
tableRouter.get("/tableColumns/:name", tableController.selectTableDataColumns);
tableRouter.post("/tableAdd/:name", tableController.addData);
tableRouter.post("/tableChangeData/:name", tableController.changeData);
tableRouter.post("/tableDeleteData/:name", tableController.deleteData);


module.exports = tableRouter;

//template

// app.get("/tablesName", async (req, res) => {
//     try {
//         const [names] = await promisePool.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = 'bppppvfgvsskvuc87ysa'");

//         res.render("admin.hbs", {
//             names
//         });
//     } catch (error) {

//     }
// });

// app.get("/tableColumns/:name", async (req, res) => {
//     try {
//         const { name } = req.params;

//         const [columns] = await promisePool.execute("SELECT COLUMN_NAME, COLUMN_KEY, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?", [name]);

//         const [data] = await promisePool.execute("SELECT * FROM `" + name + "`");


//         for (let i = 0; i < data.length; i++) {
//             if (data[i]?.Image) {
//                 data[i].Image = "data:image/png;base64," + Buffer.from(data[i].Image).toString("base64")
//             }
//         }

//         // console.log(columns);

//         const colum = columns.map((column) => column.COLUMN_NAME);
//         const primaryKey = columns.find((colum) => { if (colum.COLUMN_KEY === 'PRI') { return colum } }).COLUMN_NAME

//         res.render("table.hbs", {
//             columns: colum,
//             columnsDataType: columns,
//             data: data,
//             tableName: name,
//             primaryKey
//         });
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.post("/tableAdd/:name", async (req, res) => {
//     try {
//         const { name } = req.params;

//         let { data, columnsName } = req.body;

//         columnsName = columnsName.map((name) => "`" + name + "`");
//         data = data.map((value) => `'${value}'`);

//         let set = " ";

//         let bufferValue;

//         for (let i = 0; i < columnsName.length; i++) {
//             if (i + 1 < columnsName.length) {
//                 if (columnsName[i] === "`Image`") {
//                     bufferValue = Buffer.from(data[i], "base64");
//                     set += `BINARY(:bufferValue)` + ",";
//                 } else {
//                     set += data[i] + ",";
//                 }
//             } else {
//                 if (columnsName[i] === "`Image`") {
//                     bufferValue = Buffer.from(data[i], "base64");
//                     set += `BINARY(:bufferValue)`;
//                 } else {
//                     set += data[i];
//                 }
//             }
//         }


//         const query =
//             "INSERT INTO `" +
//             name +
//             "`(" +
//             columnsName.join(",") +
//             ") VALUES(" +
//             set +
//             ")";

//         pool.getConnection((err, connection) => {
//             connection.query(query, { bufferValue }, (err, respond, fields) => {
//                 if (!respond) {
//                     res.sendStatus(304);

//                 } else {
//                     res.sendStatus(200);
//                 }
//                 pool.releaseConnection(connection);
//             });
//         });

//     } catch (error) {
//         console.log(error);
//     }
// })

// app.post("/tableChangeData/:name", async (req, res) => {
//     try {
//         const { name } = req.params;

//         let { columnsName, data, field, id } = req.body;

//         columnsName = columnsName.map((name) => "`" + name + "`");
//         data = data.map((value) => `'${value}'`);

//         let set = " SET ";

//         let bufferValue;

//         for (let i = 0; i < columnsName.length; i++) {
//             if (i + 1 < columnsName.length) {
//                 if (columnsName[i] === "`Image`") {
//                     bufferValue = Buffer.from(data[i], "base64");
//                     set += columnsName[i] + "=" + `BINARY(:bufferValue)` + ",";
//                 } else {
//                     set += columnsName[i] + "=" + data[i] + ",";
//                 }
//             } else {
//                 if (columnsName[i] === "`Image`") {
//                     bufferValue = Buffer.from(data[i], "base64");
//                     set += columnsName[i] + "=" + `BINARY(:bufferValue)`;
//                 } else {
//                     set += columnsName[i] + "=" + data[i];
//                 }
//             }
//         }

//         const query =
//             "UPDATE `" +
//             name + "`" +
//             set +
//             " WHERE " +
//             "`" +
//             `${field}` +
//             "`" +
//             "=" +
//             `'${id}'`;
//         pool.getConnection((err, connection) => {
//             connection.query(query, { bufferValue }, (err, respond, fields) => {
//                 if (err) throw err;
//                 if (respond.affectedRows === 0) {
//                     res.sendStatus(404)
//                 } else {
//                     res.sendStatus(200);
//                 }
//                 pool.releaseConnection(connection);
//             });
//         });

//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(500);
//     }
// });

// app.post("/tableDeleteData/:name", async (req, res) => {
//     try {
//         const { name } = req.params;

//         const { field, id } = req.body;

//         const query =
//             "DELETE FROM `" +
//             name +
//             "` WHERE " +
//             "`" +
//             `${field}` +
//             "`" +
//             "=" +
//             `${id}`;
//         pool.getConnection((err, connection) => {
//             connection.query(query, (err, respond, fields) => {
//                 if (err) {
//                     // console.log(err);
//                     res.sendStatus(304);
//                 } else {
//                     res.sendStatus(200);
//                 }
//                 pool.releaseConnection(connection);
//             });
//         });

//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(500);
//     }
// });
