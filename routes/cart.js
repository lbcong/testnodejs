var express = require('express');
var router = express.Router();
var productsController = require('../controllers/ProductsController');
/* GET users listing. */

router.get('/', function(req, res) {
    var cart = req.session.cart;
    res.locals.cart = cart.getCart();
    res.render('cart');
});

router.put('/', function(req, res) {
    var productid = req.body.id;
    var quantity =parseInt(req.body.quantity);
    var cartItem =req.session.cart.update(productid,quantity);
    res.json(cartItem);
});

router.delete('/all', function(req, res) {
    req.session.cart.empty();
    res.sendStatus(204);
    res.end();
});

router.delete('/', function(req, res) {
    var productid = req.body.id;
    req.session.cart.remove(productid);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice,
    });
});

router.post('/', function(req, res, next) {
    var productid = req.body.id;
    var quantity = isNaN(req.body.quantity)?1:req.body.quantity;
    productsController.getById(productid)
        .then(
            data => {
                res.json(req.session.cart.add(data,productid,quantity));
            })
        .catch(error => next(error));
});

module.exports = router;