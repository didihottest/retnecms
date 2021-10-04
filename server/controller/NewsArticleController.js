const News_Article = require("../models").News_Article

const AppError = require("../utils/appError");
const message = require('../config/message');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const Category = require('../models').Category
const User = require('../models').User
const fs = require('fs')

const {
  Op
} = require("sequelize");
const Pagination = require('../utils/pagination');

const getNewsArticle = (req, res, next) => {
  const where = {};
  const {
    pageNumber,
    pageSize,
    filter: {
      article_title,
      username,
      category_name,
      status,
      startDate,
      endDate
    }
  } = req.body;

  if (article_title) where['article_title'] = {
    [Op.iLike]: `%${article_title}%`
  };

  if (startDate && endDate) {
    where['article_title'] = {
      [Op.between]: [startDate, endDate]
    };
  }

  let categoryConditions = {};


  if (category_name) categoryConditions['category_name'] = {
    [Op.iLike]: `%${category_name}%`
  };

  let userConditions = {};

  if (status) where['status'] = { [Op.iLike]: `%${status}%` }
  if (username) userConditions['username'] = {
    [Op.iLike]: `%${username}%`
  };

  const {
    limit,
    offset
  } = Pagination.getPagination(pageNumber, pageSize);

  console.log(where);
  console.log(userConditions);
  console.log(categoryConditions);
  return News_Article.findAndCountAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category_name'],
        where: categoryConditions,
      },
      {
        model: User,
        as: 'user',
        attributes: ['username'],
        where: userConditions
      }
    ],
    where,
    limit,
    offset,
    distinct: true,
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(data => {
    const response = Pagination.getPagingData(data, pageNumber, limit);

    res.json({
      data: response,
      message: `Get News_Article ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

const getNewsArticleById = (req, res, next) => {
  return News_Article.findOne({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category_name']
      },
      {
        model: User,
        as: 'user',
        attributes: ['username']
      }
    ],
    where: {
      uuid: req.params.id
    }
  }).then(data => {

    if (!data) {
      throw new AppError(404, message.ID_News_Article_NOT_FOUND);
    }
    res.json({
      data: data,
      message: `Get Id News_Article ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

// GET NEW ARTICLE
const getNewsArticleAll = (req, res, next) => {
  return News_Article.findAndCountAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category_name']
      },
      {
        model: User,
        as: 'user',
        attributes: ['username']
      }
    ],
  }).then(data => {
    res.json({
      data: data,
      message: `Get News_Article ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

// CREATE NEW ARTICLE
const createNewsArticle = async (req, res, next) => {
  try {

    uuidValue = uuidv4()


    let image1 = {
      uuid: req.files.image1[0].filename.slice(0, 36),
      type: req.files.image1[0].originalname.split('.').pop(),
    };
    let image2 = {
      uuid: req.files.image2[0].filename.slice(0, 36),
      type: req.files.image2[0].originalname.split('.').pop(),
    };


    if (!req.files.image1[0]) {
      if (image1) {
        fs.unlinkSync(__basedir + '/server/public/image/' + `${image1.uuid}.${image1.type}`)
      }
      if (image2) {
        fs.unlinkSync(__basedir + '/server/public/image/' + `${image2.uuid}.${image2.type}`)
      }
      throw new AppError(404, message.FILE_NOT_FOUND);
    }
    if (!req.files.image2[0]) {
      if (image1) {
        fs.unlinkSync(__basedir + '/server/public/image/' + `${image1.uuid}.${image1.type}`)
      }
      if (image2) {
        fs.unlinkSync(__basedir + '/server/public/image/' + `${image2.uuid}.${image2.type}`)
      }
      throw new AppError(404, message.FILE_NOT_FOUND);
    }

    const newNews_Article = await News_Article.create({
      uuid: uuidValue,
      article_title: req.body.article_title,
      article_summary: req.body.article_summary,
      article_content: req.body.article_content,
      image1_url: `https://api.retnecms.com/public/image/${image1.uuid}.${image1.type}`,
      image2_url: `https://api.retnecms.com/public/image/${image2.uuid}.${image2.type}`,
      status: req.body.status,
      user_uuid: req.decoded.user_id,
      category_uuid: req.body.category_uuid
    });
    res.json({
      data: newNews_Article,
      message: `News Article ${message.SUCCESSFULLY_CREATED}`
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE NEW ARTICLE
const updateNewsArticle = async (req, res, next) => {
  try {
    const News_ArticleData = await News_Article.findByPk(req.params.id);
    if (!News_ArticleData) {
      throw new AppError(404, message.ID_News_Article_NOT_FOUND);
    }

    const { article_title, article_summary, article_content, status } = req.body;
    let image1 = null
    if (req.files.image1) {
      let imageFixLocation1 = News_ArticleData.image1_url
      let imageRelativeLocation1 = imageFixLocation1.replace('https://api.retnecms.com/public/image/', '')
      fs.unlinkSync(__basedir + '/server/public/image/' + imageRelativeLocation1)
      image1 = {
        uuid: req.files.image1[0].filename.slice(0, 36),
        type: req.files.image1[0].originalname.split('.').pop(),
      };
    }
    let image2 = null
    if (req.files.image1) {
      let imageFixLocation2 = News_ArticleData.image2_url
      let imageRelativeLocation2 = imageFixLocation2.replace('https://api.retnecms.com/public/image/', '')
      fs.unlinkSync(__basedir + '/server/public/image/' + imageRelativeLocation2)
      image2 = {
        uuid: req.files.image2[0].filename.slice(0, 36),
        type: req.files.image2[0].originalname.split('.').pop(),
      };
    }


    let updateData = {};
    if (article_title !== "") {
      updateData['article_title'] = article_title;
    }

    if (article_summary !== "") {
      updateData['article_summary'] = article_summary;
    }

    if (article_content !== "") {
      updateData['article_content'] = article_content;
    }

    if (image1 !== "") {
      updateData['image1_url'] = `https://api.retnecms.com/public/image/${image1.uuid}.${image1.type}`;
    }

    if (image2 !== "") {
      updateData['image2_url'] = `https://api.retnecms.com/public/image/${image2.uuid}.${image2.type}`;
    }

    if (status !== "") {
      updateData['status'] = status;
    }

    console.log('====================================');
    console.log(updateData);
    console.log('====================================');

    const data = await News_ArticleData.update(updateData);

    res.json({
      data: data,
      message: `News_Article ${message.SUCCESSFULLY_UPDATED}`
    });

  } catch (err) {
    next(err);
  }
};

// Find News_Article by News_Articlename to Autocomplete
const getByNewsArticleTitle = async (req, res, next) => {
  try {
    const { article_title } = req.body;

    const data = await News_Article.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['category_name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['username']
        }
      ],
      where: {
        News_Articlename: {
          [Op.iLike]: `%${article_title}%`
        }
      }
    });

    res.json({
      data: data
    });
  } catch (err) {
    next(err);
  }
};

const getByNewsArticleCategory = async (req, res, next) => {
  try {
    const { category_uuid } = req.body;

    const data = await News_Article.findAll({
      where: {
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['category_name']
          },
          {
            model: User,
            as: 'user',
            attributes: ['username']
          }
        ],
        category_uuid: {
          [Op.iLike]: `%${category_uuid}%`
        }
      }
    });

    res.json({
      data: data
    });
  } catch (err) {
    next(err);
  }
};

const deleteNewsArticle = async (req, res, next) => {
  try {

    const articleData = await News_Article.findOne({
      where: {
        uuid: req.params.id
      }
    })

    if (!articleData) throw new AppError(401, "Article Not Found")

    const NewsArticleData = await News_Article.destroy({
      where: {
        uuid: req.params.id
      }
    });

    let imageFixLocation1 = articleData.image1_url
    let imageRelativeLocation1 = imageFixLocation1.replace('https://api.retnecms.com/public/image/', '')
    fs.unlinkSync(__basedir + '/server/public/image/' + imageRelativeLocation1)

    let imageFixLocation2 = articleData.image2_url
    let imageRelativeLocation2 = imageFixLocation2.replace('https://api.retnecms.com/public/image/', '')
    fs.unlinkSync(__basedir + '/server/public/image/' + imageRelativeLocation2)

    if (!NewsArticleData) {
      throw new AppError(404, message.ID_News_Article_NOT_FOUND);
    }

    res.json({
      message: `News Article ${message.SUCCESSFULLY_DELETED}`
    });
  } catch (err) {
    next(err);
  }
};




module.exports = {
  getNewsArticle,
  getNewsArticleById,
  getNewsArticleAll,
  createNewsArticle,
  updateNewsArticle,
  getByNewsArticleTitle,
  getByNewsArticleCategory,
  deleteNewsArticle
};