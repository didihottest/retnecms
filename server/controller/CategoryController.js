const Category = require("../models").Category
const AppError = require("../utils/appError");
const message = require('../config/message');
const Pagination = require('../utils/pagination');

const {
  Op
} = require("sequelize");

exports.getCategoryFiltered = (req, res, next) => {
  const {
    pageNumber,
    pageSize,
    filter: {
      category_name,
      startDate,
      endDate
    }
  } = req.body;


  let condition = {};

  if (category_name) {
    condition.category_name = { [Op.iLike]: `%${category_name}%` }
  }

  if (startDate && endDate) {
    condition.createdAt = { [Op.between]: [startDate, endDate] }
  }

  const {
    limit,
    offset
  } = Pagination.getPagination(pageNumber, pageSize);

  return Category.findAndCountAll({
    where: condition,
    order: [
      ['createdAt', 'DESC']
    ],
    limit,
    offset,
    distinct: true
  }).then(data => {
    const response = Pagination.getPagingData(data, pageNumber, limit);

    res.json({
      data: response,
      message: `Get Category ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

exports.getCategoryAll = (req, res, next) => {
  Category.findAndCountAll({ order: [["category_name", "ASC"]] }).then(response => {
    res.status(200).json({
      data: response,
      message: `Get Category ${message.SUCCESSFULLY}`
    })
  }).catch(error => {
    next(error)
  })
}

exports.postCategory = async (req, res, next) => {
  const { category_name } = req.body
  try {
    const newCategory = await Category.create({
      category_name: category_name
    })
    res.status(200).json({
      data: newCategory,
      message: message.SUCCESSFULLY_CREATED
    })
  } catch (error) {
    next(error)
  }
}

exports.getCategoryById = (req, res, next) => {
  return Category.findByPk(req.params.id)
    .then(data => {

      if (!data) {
        throw new AppError(404, message.ID_Category_NOT_FOUND);
      }

      res.json({
        data: data,
        message: `Get Id Category ${message.SUCCESSFULLY}`
      });

    }).catch(err => {
      next(err);
    });
};

exports.updateCategory = async (req, res, next) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id);
    if (!CategoryData) {
      throw new AppError(404, message.ID_Category_NOT_FOUND);
    }

    const data = await CategoryData.update({
      category_name: req.body.category_name
    });

    res.json({
      data: data,
      message: `Category ${message.SUCCESSFULLY_UPDATED}`
    });

  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {

    const CategoryData = await Category.destroy({
      where: {
        uuid: req.params.id
      }
    });

    if (!CategoryData) {
      throw new AppError(404, message.ID_Category_NOT_FOUND);
    }

    res.json({
      message: `Category ${message.SUCCESSFULLY_DELETED}`
    });
  } catch (err) {
    next(err);
  }
};

