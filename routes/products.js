var express = require('express');
var router = express.Router();

// Require controller modules.
var categoriesController = require('../controllers/CategoriesController');
var productsController = require('../controllers/ProductsController');
var brandsController = require('../controllers/BrandsController');
var colorsController = require('../controllers/ColorsController');
/* GET users listing. */
router.get('/', function (req, res, next) {

    if(req.query.category == null || isNaN(req.query.category)){
        req.query.category =0;
    }
    if(req.query.brand == null || isNaN(req.query.brand)){
        req.query.brand =0;
    }
    if(req.query.color == null || isNaN(req.query.color)){
        req.query.color =0;
    }

    if(req.query.min == null || isNaN(req.query.min)){
        req.query.min =0;
    }
    if(req.query.max == null || isNaN(req.query.max)){
        req.query.max =100;
    }
    if(req.query.limit == null || isNaN(req.query.limit)){
        req.query.limit =9;
    }
    if(req.query.page == null || isNaN(req.query.page)){
        req.query.page =1;
    }
    if(req.query.search == null||req.query.search.trim()==""){
        req.query.sort ='name';
    }
    if(req.query.sort == null){
        req.query.sort ='name';
    }
    categoriesController.getAll(req.query)
        .then(
            data => {
                res.locals.categories = data;
                return brandsController.getAll(req.query);
            })
        .then(
            data => {
                res.locals.brands = data;
                return colorsController.getAll(req.query);
            })
        .then(
            data => {
                res.locals.colors = data;
                return productsController.getAll(req.query);
            })
        .then(
            data => {
                res.locals.products = data.rows;
                res.locals.pagination={
                    page: parseInt(req.query.page),
                    limit: parseInt(req.query.limit),
                    totalRows: data.count
                };
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
