const db = require("../util/database");

const translateTableName = {
    'users': 'Пользователи',
    'Order': 'Заявки',
    'Services': 'Услуги',
}
exports.selectTablesName = async (req, res) => {
    try {
        const [names] = await db.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = 'boeejsqyv4gxfs7gshhn'");

        for (let i = 0; i < names.length; i++) {

            names[i].TABLE_NAME = translateTableName[names[i].TABLE_NAME];
        }


        res.render("admin.hbs", {
            names: translateTableName,
        });
    } catch (error) {
        console.log(error);

        return res.sendStatus(500);
    }
}
const usersTranslate = {
    "Почта": "email",
    "Номер пользователя": "idusers",
    "Логин": "login",
    "Пароль": "password"
}

const serviceTranslitiion = {
    "Номер типа услуги": "idServices",
    "Название": "Title",
    "Изображение": "Image",
    "Описание": "Description"
}

const orderTranslate = {
    "Номер заказа": "idOrder",
    "Услуга": "idService",
    "Номер пользователя": "idUser",
    "Дата": "Date",

}
exports.selectTableDataColumns = async (req, res) => {
    try {
        const { name } = req.params;

        const [columns] = await db.execute("SELECT COLUMN_NAME, COLUMN_KEY, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?", [name]);

        let data;
        let services;
        if (name === "Order") {
            [data] = await db.execute("SELECT A.idOrder, A.idUser, concat(A.idService, ' ', B.Title) as idService, A.Date FROM bppppvfgvsskvuc87ysa.Order as A inner join bppppvfgvsskvuc87ysa.Services as B on  A.idService =  B.idServices;");
            [services] = await db.execute("SELECT * FROM bppppvfgvsskvuc87ysa.Services");
        } else {
            [data] = await db.execute("SELECT * FROM `" + name + "`");
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i]?.Image) {
                data[i].Image = "data:image/png;base64," + Buffer.from(data[i].Image).toString("base64")
            }
            if (data[i]?.Date) {
                const date = new Date(data[i].Date)
                var culture = new Intl.DateTimeFormat('ru').format(date).split(".").reverse().join("-")
                // console.log(culture);
                // const formatted = new Intl.DateTimeFormat('en-US').format(date).split("/").reverse().join("-");
                data[i].Date = culture;
            }
            if (data[i]?.idService) {

                const id = data[i].idService.split(' ')[0];
                const spltedStr = data[i].idService.split(' ');
                data[i].idService = spltedStr[1] + " " + spltedStr[2];
                // Object.assign(data[i],{'idS': id});
            }
        }
        let colum = columns.map((column) => column.COLUMN_NAME);

        switch (name) {
            case "users":
                colum = usersTranslate;
                for (let i = 0; i < columns.length; i++) {
                    columns[i].COLUMN_NAME = Object.keys(usersTranslate).find(key => usersTranslate[key] === columns[i].COLUMN_NAME);
                }
                break;
            case "Services":
                colum = serviceTranslitiion;
                for (let i = 0; i < columns.length; i++) {
                    columns[i].COLUMN_NAME = Object.keys(serviceTranslitiion).find(key => serviceTranslitiion[key] === columns[i].COLUMN_NAME);
                }
                break;
            case "Order":
                colum = orderTranslate;
                for (let i = 0; i < columns.length; i++) {
                    columns[i].COLUMN_NAME = Object.keys(orderTranslate).find(key => orderTranslate[key] === columns[i].COLUMN_NAME);
                }
                break;
            default:
                break;
        }

        const primaryKey = columns.find((colum) => { if (colum.COLUMN_KEY === 'PRI') { return colum } }).COLUMN_NAME
        // console.log(services);
        res.render("table.hbs", {
            columns: colum,
            columnsDataType: columns,
            data: data,
            tableName: name,
            primaryKey,
            services
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


        switch (name) {
            case "users":
                for (let i = 0; i < columnsName.length; i++) {

                    columnsName[i] = usersTranslate[columnsName[i]];
                }
                break;
            case "Services":
                for (let i = 0; i < columnsName.length; i++) {

                    columnsName[i] = serviceTranslitiion[columnsName[i]];
                }
                break;
            case "Order":
                for (let i = 0; i < columnsName.length; i++) {

                    columnsName[i] = orderTranslate[columnsName[i]];
                }
                break;
            default:
                break;
        }

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



        if (bufferValue) {

            await db.execute(query, [bufferValue]);
        } else {
            await db.execute(query);

        }

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

        switch (name) {
            case "users":
                field = usersTranslate[field];
                for (let i = 0; i < columnsName.length; i++) {

                    columnsName[i] = usersTranslate[columnsName[i]];
                }
                break;
            case "Services":
                field = serviceTranslitiion[field];

                for (let i = 0; i < columnsName.length; i++) {

                    columnsName[i] = serviceTranslitiion[columnsName[i]];
                }
                break;
            case "Order":
                field = orderTranslate[field];

                for (let i = 0; i < columnsName.length; i++) {

                    columnsName[i] = orderTranslate[columnsName[i]];
                }
                break;
            default:
                break;
        }

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
        if (bufferValue) {

            await db.execute(query, [bufferValue]);
        } else {
            await db.execute(query);

        }
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

        let { field, id } = req.body;

        switch (name) {
            case "users":
                field = usersTranslate[field];

                break;
            case "Services":
                field = serviceTranslitiion[field];

                break;
            case "Order":
                field = orderTranslate[field];
                break;
            default:
                break;
        }

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