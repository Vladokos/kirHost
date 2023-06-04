const Order = require("../models/orderModel");

exports.leaveOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, login } = req.body;

        const order = new Order(id);
        const response = await order.create(email, login);

        res.sendStatus(response);
    } catch (error) {
        console.log(error);
    }
}
