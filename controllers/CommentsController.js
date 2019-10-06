var models = require('../models');
var Comment = models.Comment;
var controller = {};
var sequelize = require('sequelize');
var Op = sequelize.Op;

controller.add = (comment)=>{
    return new Promise((resolve, reject) => {
        Comment.create(comment
        ).then(
            data => resolve(data)
        ).catch(error => reject(new Error(error)));
    });
}

module.exports = controller;