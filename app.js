var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

//helper
var helper = require('./helper/helper');
// view engine setup
var hbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        createStarList: helper.createStarList,
        createStarVote: helper.createStarVote,
        createPagination: paginateHelper.createPagination
    }
}));
app.set('view engine', 'hbs');

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// session parser
var expressSession = require('express-session');
app.use(expressSession({
    cookie: {httpOnly: true, maxAge: 30 * 24 * 3600 * 1000},
    secret: 'AlexT',
    resave: false,
    saveUninitialized: false
}));

// cart middleware
var Cart = require('./controllers/CartController');
app.use((req, res, next) => {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;
    res.locals.totalQuantity = cart.totalQuantity;
    next();
});

// setup router
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// setup router path
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var cartRouter = require('./routes/cart');
var commentRouter = require('./routes/comment');
var reviewRouter = require('./routes/review');

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/carts', cartRouter);
app.use('/comments', commentRouter);
app.use('/reviews', reviewRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
