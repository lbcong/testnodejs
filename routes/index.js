var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'index'});
});

router.get('/:page', function (req, res, next) {
    let page = req.params.page;
    let banners = {
            'single-blog': 'Blog Details',
            'blog': 'Our Blog',
            'category': 'Shop Category',
            'checkout': 'Product Checkout',
            'confirmation': 'Order Confirmation',
            'contact': 'Contact Us',
            'login': 'Login / Register',
            'register': 'Register',
            'single-product': 'Shop Single',
            'tracking-order': 'Order Tracking'
        }
    ;
    res.render(page, {banner: banners[page], title: page});
});

router.get('/blog', function (req, res, next) {
    res.render('blog', {title: 'blog'});
});

router.get('/single-blog', function (req, res, next) {
    res.render('single-blog', {title: 'single-blog'});
});

router.get('/category', function (req, res, next) {
    res.render('category', {title: 'category'});
});

router.get('/single-product', function (req, res, next) {
    res.render('single-product', {title: 'single-product'});
});

router.get('/cart', function (req, res, next) {
    res.render('cart', {title: 'cart'});
});

router.get('/checkout', function (req, res, next) {
    res.render('checkout', {title: 'checkout'});
});

router.get('/contact', function (req, res, next) {
    res.render('contact', {title: 'contact'});
});

router.get('/confirmation', function (req, res, next) {
    res.render('confirmation', {title: 'confirmation'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'login'});
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'register'});
});

router.get('/tracking-order', function (req, res, next) {
    res.render('tracking-order', {title: 'tracking-order'});
});


module.exports = router;
