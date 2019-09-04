var express = require('express');
var router = express.Router();

// Require controller modules.
var categoriesController = require('../controllers/CategoriesController');
var productsController = require('../controllers/ProductsController');
var brandsController = require('../controllers/BrandsController');
var colorsController = require('../controllers/ColorsController');
/* GET users listing. */
router.get('/', function (req, res, next) {
    categoriesController.getAll()
        .then(
            data => {
                res.locals.categories = data;
                return brandsController.getAll();
            })
        .then(
            data => {
                res.locals.brands = data;
                return colorsController.getAll();
            })
        .then(
            data => {
                res.locals.colors = data;
                return productsController.getAll();
            })
        .then(
            data => {
                res.locals.products = data;
                res.render('category', {title: 'category'});
            })
        .catch(error => next(error));
});

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    res.locals.banner = 'Shop Single';
    productsController.getById(id)
        .then(
            data => {
                res.locals.product = data;
                res.render('single-product', {title: 'single-product'});
            })
        .catch(error => next(error));
});

module.exports = router;
