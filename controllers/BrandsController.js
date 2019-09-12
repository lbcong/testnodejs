var models = require('../models');
var brands = models.Brand;
var controller = {};
var sequelize = require('sequelize');
var Op = sequelize.Op;
controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        var options = {
            include: [
                {
                    model: models.Product,
                    attributes: ['id'],
                    where: {
                        price: {
                            [Op.gte]: query.min,
                            [Op.lte]: query.max
                        }

                    }
                }
            ],
            attributes: ['id', 'name', 'imagepath', 'summary']
        };
        if (query.category > 0) {
            options.include[0].where.categoryId = query.category;
        }
        if (query.color > 0) {
            options.include[0].include = [{
                model: models.ProductColor,
                attributes: ['id'],
                where: {colorId: query.color}
            }];
        }
        brands.findAll(options
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;