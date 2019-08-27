var models = require('../models');
var color = models.Color;
var controller = {};

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        color.findAll({
                include:[{model: models.ProductColor }],
                attributes: ['id', 'name', 'imagepath', 'code']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;