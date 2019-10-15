var models = require('../models');
var Review = models.Review;
var Product = models.Product;
var controller = {};
var sequelize = require('sequelize');
var Op = sequelize.Op;

controller.add = (review) => {
    return new Promise((resolve, reject) => {
        Review
            .findOne({
                where: {
                    userId: review.userId,
                    productId: review.productId
                }
            })
            .then(data => {
                if (data) {
                    return Review.update(review, {
                        where: {
                            userId: review.userId,
                            productId: review.productId
                        }
                    })
                } else {
                    Review.create(review
                    )
                }
            })
            .then(
                () => {
                    Product
                        .findOne({
                            where: {
                                id: review.productId
                            },
                            include: [{model: models.Review}],
                        })
                        .then(product => {
                            let overallReview = 0;
                            for (let i = 0; i < product.Reviews.length; i++) {
                                overallReview += product.Reviews[i].rating;
                            }
                            overallReview = overallReview / product.Reviews.length;
                            return Product.update({
                                overallReview: overallReview,
                                reviewCount: product.Reviews.length
                            }, {
                                where: {
                                    id: product.id
                                }
                            })
                        });

                }
            )
            .then(data => {
                resolve(data)
            })
            .catch(error => reject(new Error(error)));
    });
}

controller.getUserReviewProduct = (userId,productId)=>{
    return Review.findOne({
        where:{
            userId: userId,
            productId: productId
        }
    })
}

module.exports = controller;