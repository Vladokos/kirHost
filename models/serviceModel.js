const db = require("../util/database");

module.exports = class Services {
    constructor(idServices, title, description, image) {
        this.idServices = idServices;
        this.title = title;
        this.description = description;
        this.image = image;
    }

    async selectAll() {
        const [data] = await db.execute("SELECT * FROM `Services`");

        for (let i = 0; i < data.length; i++) {
            if (data[i]?.Image) {
                data[i].Image = "data:image/png;base64," + Buffer.from(data[i].Image).toString("base64")
            }
        }

        return data;
    }

    async select() {
        const [data] = await db.execute("SELECT * FROM `Services` WHERE idServices = ?", [idServices]);

        if (data[0]?.Image) {
            data[0].Image = "data:image/png;base64," + Buffer.from(data[0].Image).toString("base64")
        }

        return data;
    }


}