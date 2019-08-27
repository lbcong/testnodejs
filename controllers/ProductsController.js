var models = require('../models');
var products = models.Product;
var controller = {};

controller.getTrending = () => {
    return new Promise((resolve, reject) => {
        products.findAll({
                order: [['overallReview', 'DESC']],
                limit: 8,
                include:[{model: models.Category }],
                attributes: ['id', 'name', 'imagepath', 'summary', 'price']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        products.findAll({
                order: [['overallReview', 'DESC']],
                include:[{model: models.Category }],
                attributes: ['id', 'name', 'imagepath', 'summary', 'price']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

controller.getRelative = () => {
    return new Promise((resolve, reject) => {
        products.findAll({
                order: [['overallReview', 'DESC']],
                include:[{model: models.Category }],
                attributes: ['id', 'name', 'imagepath', 'summary', 'price']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;