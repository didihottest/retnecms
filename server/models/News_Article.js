'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News_Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News_Article.belongsTo(models.Category, {
        foreignKey: "category_uuid",
        as: 'category'
      })
      News_Article.belongsTo(models.User, {
        foreignKey: "user_uuid",
        as: 'user'
      })
    }
  };
  News_Article.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    article_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "article title must be filled"
        }
      }
    },
    article_summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "article summary must be filled"
        }
      }
    },
    article_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "article content must be filled"
        }
      }
    },
    image1_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "image1 not inserted"
        }
      }
    },
    image2_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "image2 not inserted"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "article status must be filled"
        }
      }
    },
  }, {
    sequelize,
    tableName: 'news_articles',
    modelName: 'News_Article',
  });
  return News_Article;
};