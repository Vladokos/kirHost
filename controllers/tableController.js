const db = require("../util/database");


exports.selectTablesName = async (req, res) => {
    try {
        const [names] = await db.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = 'bppppvfgvsskvuc87ysa'");

        res.render("admin.hbs", {
            names
        });
    } catch (error) {
        console.log(error);

        return res.sendStatus(500);
    }
}

exports.selectTableDataColumns = async (req, res) => {
    try {
        const { name } = req.params;

        const [columns] = await db.execute("SELECT COLUMN_NAME, COLUMN_KEY, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?", [name]);

        const [data] = await db.execute("SELECT * FROM `" + name + "`");


        for (let i = 0; i < data.length; i++) {
            if (data[i]?.Image) {
                data[i].Image = "data:image/png;base64," + Buffer.from(data[i].Image).toString("base64")
            }
            if (data[i]?.Date) {
                const date = new Date(data[i].Date)
                const formatted = new Intl.DateTimeFormat('en-US').format(date).split("/").reverse().join("-");
                data[i].Date = formatted;
            }
        }

        const colum = columns.map((column) => column.COLUMN_NAME);
        const primaryKey = columns.find((colum) => { if (colum.COLUMN_KEY === 'PRI') { return colum } }).COLUMN_NAME

        res.render("table.hbs", {
            columns: colum,
            columnsDataType: columns,
            data: data,
            tableName: name,
            primaryKey
        });
    } catch (error) {
        console.log(error);

        return res.sendStatus(500);
    }
}


exports.addData = async (req, res) => {
    try {
        const { name } = req.params;

        let { data, columnsName } = req.body;

        columnsName = columnsName.map((name) => "`" + name + "`");
        data = data.map((value) => `'${value}'`);

        let set = " ";

        let bufferValue;

        for (let i = 0; i < columnsName.length; i++) {
            if (i + 1 < columnsName.length) {
                if (columnsName[i] === "`Image`") {
                    bufferValue = Buffer.from(data[i], "base64");
                    // set += `BINARY(:bufferValue)` + ",";
                    set += `?` + ",";
                } else {
                    set += data[i] + ",";
                }
            } else {
                if (columnsName[i] === "`Image`") {
                    bufferValue = Buffer.from(data[i], "base64");
                    // set += `BINARY(:bufferValue)`;
                    set += `?`;
                } else {
                    set += data[i];
                }
            }
        }


        const query =
            "INSERT INTO `" +
            name +
            "`(" +
            columnsName.join(",") +
            ") VALUES(" +
            set +
            ")";

        await db.execute(query, [bufferValue]);

        res.sendStatus(200);

        // pool.getConnection((err, connection) => {
        //     connection.query(query, { bufferValue }, (err, respond, fields) => {
        //         if (!respond) {
        //             res.sendStatus(304);

        //         } else {
        //             res.sendStatus(200);
        //         }
        //         pool.releaseConnection(connection);
        //     });
        // });

    } catch (error) {
        console.log(error);

        return res.sendStatus(500);

    }
}

exports.changeData = async (req, res) => {
    try {
        const { name } = req.params;

        let { columnsName, data, field, id } = req.body;

        columnsName = columnsName.map((name) => "`" + name + "`");
        data = data.map((value) => `'${value}'`);

        let set = " SET ";

        let bufferValue;

        for (let i = 0; i < columnsName.length; i++) {
            if (i + 1 < columnsName.length) {
                if (columnsName[i] === "`Image`") {
                    bufferValue = Buffer.from(data[i], "base64");
                    // set += columnsName[i] + "=" + `BINARY(:bufferValue)` + ",";
                    set += columnsName[i] + "=" + `?` + ",";
                } else {
                    set += columnsName[i] + "=" + data[i] + ",";
                }
            } else {
                if (columnsName[i] === "`Image`") {
                    bufferValue = Buffer.from(data[i], "base64");
                    // set += columnsName[i] + "=" + `BINARY(:bufferValue)`;
                    set += columnsName[i] + "=" + `?`;
                } else {
                    set += columnsName[i] + "=" + data[i];
                }
            }
        }

        const query =
            "UPDATE `" +
            name + "`" +
            set +
            " WHERE " +
            "`" +
            `${field}` +
            "`" +
            "=" +
            `'${id}'`;
        await db.execute(query,[bufferValue]);
        res.sendStatus(200);

        // pool.getConnection((err, connection) => {
        //     connection.query(query, { bufferValue }, (err, respond, fields) => {
        //         if (err) throw err;
        //         if (respond.affectedRows === 0) {
        //             res.sendStatus(404)
        //         } else {
        //             res.sendStatus(200);
        //         }
        //         pool.releaseConnection(connection);
        //     });
        // });

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

exports.deleteData = async (req, res) => {
    try {
        const { name } = req.params;

        const { field, id } = req.body;

        const query =
            "DELETE FROM `" +
            name +
            "` WHERE " +
            "`" +
            `${field}` +
            "`" +
            "=" +
            `${id}`;

        const [data] = await db.execute(query);

        res.sendStatus(200);
        // pool.getConnection((err, connection) => {
        //     connection.query(query, (err, respond, fields) => {
        //         if (err) {
        //             res.sendStatus(304);
        //         } else {
        //             res.sendStatus(200);
        //         }
        //         pool.releaseConnection(connection);
        //     });
        // });

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}