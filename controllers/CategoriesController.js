var models = require('../models');
var categories = models.Category;
var controller = {};

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        categories.findAll({
            attributes: ['id', 'name', 'imagepath', 'summary'],
            include:[{model: models.Product }]
        }).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;