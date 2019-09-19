var models = require('../models');
var products = models.Product;
var controller = {};
var sequelize = require('sequelize');
var Op = sequelize.Op;
controller.getTrending = () => {
    return new Promise((resolve, reject) => {
        products.findAll({
                order: [['overallReview', 'DESC']],
                limit: 8,
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'summary', 'price']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

controller.getAll = (query) => {
    var options = {
        order: [['overallReview', 'DESC']],
        include: [{model: models.Category}],
        attributes: ['id', 'name', 'imagepath', 'summary', 'price'],
        where: {
            price: {
                [Op.gte]: query.min,
                [Op.lte]: query.max
            }

        }
    };
    if (query.category > 0) {
        options.where.categoryId = query.category;
    }
    if (query.limit > 0) {
        options.limit = query.limit;
        options.offset = query.limit * (query.page - 1);
    }
    if (query.search != null && query.search != "") {
        options.where.name={
            [Op.iLike]: `%${query.search}%`
        };
    }
    if (query.sort) {
        switch (query.sort) {
            case "name":
                options.order = [
                    ['name', 'ASC']
                ];
                break;
            case "price":
                options.order = [
                    ['price', 'ASC']
                ];
                break;
            case "overallReview":
                options.order = [
                    ['overallReview', 'DESC']
                ];
                break;
            default:
                options.order = [
                    ['name', 'ASC']
                ];
        }
    }
    if (query.color > 0) {
        options.include.push({
            model: models.ProductColor,
            attributes: ['id'],
            where: {colorId: query.color}
        });
    }
    if (query.brand > 0) {
        options.where.brandId = query.brand;
    }


    return new Promise((resolve, reject) => {
        products.findAndCountAll(options
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

controller.getRelative = () => {
    return new Promise((resolve, reject) => {
        products.findAll({
                order: [['overallReview', 'DESC']],
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'summary', 'price']
            }
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });

};

controller.getById = (id) => {
    return new Promise((resolve, reject) => {
        var product;
        products.findOne({
                where: {id: id},
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'summary', 'price', 'availability', 'description', 'overallReview', 'reviewCount']
            }
        ).then(
            data => {
                product = data;
                return models.ProductSpecification.findAll({
                    where: {productId: id},
                    include: [{model: models.Specification}],
                });
            }
        ).then(
            productSpecification => {
                product.ProductSpecification = productSpecification;
                return models.Comment.findAll({
                    where: {productId: id, parentCommentId: null},
                    include: [{model: models.User},
                        {
                            model: models.Comment,
                            as: 'SubComments',
                            include: [{model: models.User}]
                        }],
                });
            }
        ).then(
            comments => {
                product.Comments = comments;
                return models.Review.findAll({
                    where: {productId: id},
                    include: [{model: models.User}]
                });
            }
        ).then(
            reviews => {
                product.Reviews = reviews;
                var stars = [];
                for (var i = 1; i < 6; i++) {
                    stars.push(reviews.filter(item => (
                        item.rating == i
                    )).length);
                }
                product.stars = stars;
            }
        ).then(
            data => resolve(product)
        ).catch(error => reject(new Error(error)));
    });

};

module.exports = controller;