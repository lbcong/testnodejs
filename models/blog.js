'use strict';
module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        title: DataTypes.STRING,
        imagepath: DataTypes.STRING,
        author: DataTypes.STRING,
        summary: DataTypes.TEXT,
        description: DataTypes.TEXT,
        day: DataTypes.INTEGER,
        month: DataTypes.STRING
    }, {});
    Blog.associate = function(models) {
        // associations can be defined here
        Blog.belongsTo(models.Category, { foreignKey: 'categoryId' });
        Blog.hasMany(models.Comment, { foreignKey: 'blogId' });

    };
    return Blog;
};