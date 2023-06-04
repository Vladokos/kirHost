const db = require("../util/database");

const dateTime = require('node-datetime');


module.exports = class Order {
    constructor(idOrder,idUser, idService, Date) {
        this.idOrder = idOrder
        this.idUser = idUser;
        this.idService = idService;
        this.Date = Date;
    }

    async create(email, login) {

        const [duplicateUser] = await db.execute("SELECT * FROM `users` WHERE `email` = ?", [email]);

        let service;

        if (this.idOrder) {
            [service] = await db.execute("select * from `Services` where `idServices` = ?", [this.idOrder]);
        } else {
            [service] = await db.execute("select * from `Services` limit 1");
        }


        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');
        if (duplicateUser.length === 0) {
            const [user] = await db.execute("INSERT INTO `users` (`login`, `email`, `password`) VALUES (?,?,?)", [login, email, password]);

            await db.execute("INSERT INTO `Order` (`idUser`, `idService`, `Date`) VALUES (?, ?, ?)", [user[0].insertId, service[0].idServices, formatted])
        }
        else {
            await db.execute("INSERT INTO `Order` (`idUser`, `idService`, `Date`) VALUES (?, ?, ?)", [duplicateUser[0].idusers, service[0].idServices, formatted])
        }

        return 200;
    }
}