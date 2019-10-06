var express = require('express');
var router = express.Router();
var commnetsController = require('../controllers/CommentsController.js');
/* GET users listing. */

router.post('/', function(req, res, next) {
    var comment={
        userId:1,
        productId: req.body.productId,
        message: req.body.message
    };
    if(!isNaN(req.body.parentCommentId)&& req.body.parentCommentId!=''){
        comment.parentCommentId=req.body.parentCommentId;
    }
    commnetsController.add(comment)
        .then(
            data => {
                res.redirect('/products/'+data.productId);
            })
        .catch(error => next(error));
});

module.exports = router;