var models = require('../models');
var categories = models.Category;
var controller = {};
var sequelize = require('sequelize');
var Op = sequelize.Op;
controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        var options = {
            attributes: ['id', 'name', 'imagepath', 'summary'],
            include: [
                {model: models.Product,
                    where: {}}
            ]

        };
        if (query.search != null && query.search != "") {
            options.include[0].where.name = {
                [Op.iLike]: `%${query.search}%`
            };
        }
        categories.findAll(options).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });
};

module.exports = controller;