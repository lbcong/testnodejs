var models = require('../models');
var brands = models.Brand;
var controller = {};

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        brands.findAll({
                include:[{model: models.Product }],
                attributes: ['id', 'name', 'imagepath', 'summary']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;