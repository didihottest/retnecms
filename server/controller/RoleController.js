const Role = require("../models").Role
const AppError = require("../utils/appError");
const message = require('../config/message');
const Pagination = require('../utils/pagination');

const {
  Op
} = require("sequelize");

exports.getRoleFiltered = (req, res, next) => {
  const {
    pageNumber,
    pageSize,
    filter: {
      role,
      startDate,
      endDate
    }
  } = req.body;

  let condition = {};

  if (role) {
    condition.role = {
      [Op.iLike]: `%${role}%`
    }
  }

  if (startDate && endDate) {
    condition.createdAt = { [Op.between]: [startDate, endDate] }
  }

  const {
    limit,
    offset
  } = Pagination.getPagination(pageNumber, pageSize);

  return Role.findAndCountAll({
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
      message: `Get Role ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

exports.getRoleAll = (req, res, next) => {
  Role.findAndCountAll({ order: [["createdAt", "ASC"]] }).then(response => {
    res.status(200).json({
      data: response,
      message: message.SUCCESSFULLY
    })
  }).catch(error => {
    next(error)
  })
}

exports.postRole = async (req, res, next) => {
  const { role } = req.body
  try {
    const newRole = await Role.create({
      role: role
    })
    res.status(200).json({
      data: newRole,
      message: message.SUCCESSFULLY_CREATED
    })
  } catch (error) {
    next(error)
  }
}

exports.getRoleById = (req, res, next) => {
  return Role.findByPk(req.params.id)
    .then(data => {

      if (!data) {
        throw new AppError(404, message.ID_Role_NOT_FOUND);
      }

      res.json({
        data: data,
        message: `Get Id Role ${message.SUCCESSFULLY}`
      });

    }).catch(err => {
      next(err);
    });
};

exports.updateRole = async (req, res, next) => {
  try {
    const RoleData = await Role.findByPk(req.params.id);
    if (!RoleData) {
      throw new AppError(404, message.ID_Role_NOT_FOUND);
    }

    const data = await RoleData.update({
      role: req.body.role
    });

    res.json({
      data: data,
      message: `Role ${message.SUCCESSFULLY_UPDATED}`
    });

  } catch (err) {
    next(err);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {

    const RoleData = await Role.destroy({
      where: {
        uuid: req.params.id
      }
    });

    if (!RoleData) {
      throw new AppError(404, message.ID_Role_NOT_FOUND);
    }

    res.json({
      message: `Role ${message.SUCCESSFULLY_DELETED}`
    });
  } catch (err) {
    next(err);
  }
};

