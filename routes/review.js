var express = require('express');
var router = express.Router();
var reviewsController = require('../controllers/ReviewsController.js');
/* GET users listing. */

router.post('/', function(req, res, next) {
    var review={
        userId:1,
        productId: req.body.productId,
        rating: req.body.rating,
        message: req.body.message
    };

    reviewsController.add(review)
        .then(
            () => {
                res.redirect('/products/'+review.productId);
            })
        .catch(error => next(error));
});

module.exports = router;