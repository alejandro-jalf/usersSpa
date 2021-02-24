const route = require("express").Router();

route.route('/api/v1').get(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenidos a la ruta principal de userSPA'
    });
});

module.exports = route;
