const db = require("../util/database");

module.exports = class User {
    constructor(idUsers, login, email, password) {
        this.idUsers = idUsers;
        this.login = login;
        this.email = email;
        this.password = password;
    }

    async create() {
        const [duplicateUser] = await db.execute("SELECT * FROM `users` WHERE `Email` = ?", [email]);

        let status = 500;

        if (duplicateUser.length === 0) {
            const [user] = await db.execute("INSERT INTO `users` (`login`, `email`, `password`) VALUES (?,?,?)", [login, email, password]);

            status = 200;
        }
        else {
            status = 303;
        }

        return status;
    }

    async select() {
        let user;
        
        if (idUsers) {
            [user] = await db.execute("SELECT * FROM `users` WHERE `idusers` = ?", [idUsers]);
        } else {
            [user] = await db.execute("SELECT * FROM `users` WHERE `Email` = ?", [email]);
        }
        return user;
    }
}