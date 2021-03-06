var models = require('../models');
var color = models.Color;
var controller = {};
var sequelize = require('sequelize');
var Op = sequelize.Op;
controller.getAll = (query) => {
    var options = {
        attributes: ['id', 'name', 'imagepath', 'code'],
        include: [
            {
                model: models.ProductColor,
                include: [{
                    model: models.Product,
                    attributes: ['id'],
                    where: {
                        price: {
                            [Op.gte]: query.min,
                            [Op.lte]: query.max
                        }

                    }
                }]

            }
        ]
    };
    if (query.category > 0) {
        options.include[0].include[0].where.categoryId = query.category;
    }
    if (query.brand > 0) {
        options.include[0].include[0].where.brandId = query.brand;
    }
    if (query.search != null && query.search != "") {
        options.include[0].include[0].where.name = {
            [Op.iLike]: `%${query.search}%`
        };
    }
    return new Promise((resolve, reject) => {
        color.findAll(options
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;