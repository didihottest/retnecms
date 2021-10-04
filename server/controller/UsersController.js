const AppError = require("../utils/appError");
const message = require('../config/message');
const bcrypt = require('bcryptjs');

const User = require('../models').User;
const User_Profile = require('../models').User_Profile;
const Role = require('../models').Role
const sequelize = require('../models').sequelize;
const fs = require('fs')

const {
  Op
} = require("sequelize");
const Pagination = require('../utils/pagination');

const getUser = (req, res, next) => {
  const where = {};
  const {
    pageNumber,
    pageSize,
    filter: {
      username,
      role_uuid,
      email,
      startDate,
      endDate
    }
  } = req.body;

  if (startDate && endDate) {
    where['article_title'] = {
      [Op.between]: [startDate, endDate]
    };
  }

  if (username) where['username'] = {
    [Op.iLike]: `%${username}%`
  };

  if (email) where['email'] = {
    [Op.iLike]: `%${email}%`
  };

  if (role_uuid) where[`role_uuid`] = role_uuid

  where[`is_deleted`] = false


  const {
    limit,
    offset
  } = Pagination.getPagination(pageNumber, pageSize);

  // Jika bukan superadmin maka tampilkan user berdasarkan user branch loginnya
  let conditions = {};


  return User.findAndCountAll({
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['role'],
        where: conditions,
      },
      {
        model: User_Profile,
        as: 'user_profile',
      }
    ],
    where,
    limit,
    offset,
    distinct: true,
    order: [
      ['createdAt', 'ASC']
    ]
  }).then(data => {
    const response = Pagination.getPagingData(data, pageNumber, limit);

    res.json({
      data: response,
      message: `Get User ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

const getUserById = (req, res, next) => {
  return User.findOne({
    include: [{
      model: Role,
      as: 'role',
      attributes: ['role'],
    },
    {
      model: User_Profile,
      as: 'user_profile',
    }],
    where: {
      uuid: req.params.id
    }
  }).then(data => {

    if (!data) {
      throw new AppError(404, message.ID_USER_NOT_FOUND);
    }
    res.json({
      data: data,
      message: `Get Id User ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

const getUserAll = (req, res, next) => {
  return User.findAndCountAll({
    include: [{
      model: Role,
      as: 'role',
      attributes: ['role'],
    },
    {
      model: User_Profile,
      as: 'user_profile',
    }],
    where: {
      is_deleted: false
    }
  }).then(data => {
    res.json({
      data: data,
      message: `Get User ${message.SUCCESSFULLY}`
    });
  }).catch(err => {
    next(err);
  });
};

const createUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, 8),
      role_uuid: req.body.role_uuid,
    });
    res.json({
      data: newUser,
      message: `User ${message.SUCCESSFULLY_CREATED}`
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const UserData = await User.findByPk(req.params.id);
    if (!UserData) {
      throw new AppError(404, message.ID_USER_NOT_FOUND);
    }

    const { username, email, password, role_uuid } = req.body;

    let updateData = {};
    if (username !== "") {
      updateData['username'] = username;
    }

    if (email !== "") {
      updateData['email'] = email;
    }

    if (role_uuid !== "") {
      updateData['role_uuid'] = role_uuid;
    }

    if (password !== "") {
      updateData['password'] = bcrypt.hashSync(password, 8);
    }

    const data = await UserData.update(updateData);

    res.json({
      data: data,
      message: `User ${message.SUCCESSFULLY_UPDATED}`
    });

  } catch (err) {
    next(err);
  }
};

// Find User by Username to Autocomplete
const getByUsername = async (req, res, next) => {
  try {
    const { username, role_uuid } = req.body;

    const data = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${username}%`
        },
        role_uuid: role_uuid
      }
    });

    res.json({
      data: data,
      message: "Get User successfully"
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const UserData = await User.findByPk(req.params.id);
    if (!UserData) {
      throw new AppError(404, message.ID_USER_NOT_FOUND);
    }
    const data = await UserData.update({
      is_deleted: true
    });

    res.json({
      data: data,
      message: `User ${message.SUCCESSFULLY_DELETED}`
    });
  } catch (error) {
    next(error)
  }


}

const createUserProfile = async (req, res, next) => {
  const user_uuid = req.params.id

  const {
    name,
    quotes,
    facebook,
    google_plus,
    twitter,
    youtube,
    instagram,
    linkedin,
    website } = req.body

  if (!user_uuid) throw new AppError(401, message.ID_USER_NOT_FOUND)
  if (!req.file) {
    throw new AppError(404, message.FILE_NOT_FOUND);
  }
  let profilePicture = {
    uuid: req.file.filename.slice(0, 36),
    type: req.file.originalname.split('.').pop(),
  }



  try {
    const data = await User_Profile.create({
      name: name,
      profile_image_url: `https://api.retnecms.com/public/profile-image/${profilePicture.uuid}.${profilePicture.type}`,
      quotes: quotes ?? '-',
      facebook: facebook ?? '-',
      google_plus: google_plus ?? '-',
      twitter: twitter ?? '-',
      youtube: youtube ?? '-',
      instagram: instagram ?? '-',
      linkedin: linkedin ?? '-',
      website: website ?? '-',
      user_uuid: user_uuid
    })

    res.json({
      data: data,
      message: `User Profile ${message.SUCCESSFULLY_CREATED}`
    });
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (req, res, next) => {
  const user_uuid = req.params.id
  const transaction = await sequelize.transaction();

  const {
    name,
    quotes,
    facebook,
    google_plus,
    twitter,
    youtube,
    instagram,
    linkedin,
    website } = req.body



  try {
    if (!user_uuid) AppError(401, message.ID_USER_NOT_FOUND)
    const UserData = await User_Profile.findOne({
      where: {
        user_uuid: user_uuid
      },
      transaction
    });
    if (!UserData) AppError(401, message.ID_USER_NOT_FOUND)

    let imageFixLocation = UserData.profile_image_url
    let imageRelativeLocation = imageFixLocation.replace('https://api.retnecms.com/public/profile-image/', '')

    let profilePicture = null
    if (req.file) {
      fs.unlinkSync(__basedir + '/server/public/profile-image/' + imageRelativeLocation)
      profilePicture = {
        uuid: req.file.filename.slice(0, 36),
        type: req.file.originalname.split('.').pop(),
      }
    }


    let updateData = {};

    if (name) {
      Object.assign(updateData, { name: name });
    }
    if (quotes) {
      Object.assign(updateData, { quotes: quotes });
    }
    if (facebook) {
      Object.assign(updateData, { facebook: facebook });
    }
    if (google_plus) {
      Object.assign(updateData, { google_plus: google_plus });
    }
    if (twitter) {
      Object.assign(updateData, { twitter: twitter });
    }
    if (youtube) {
      Object.assign(updateData, { youtube: youtube });
    }
    if (instagram) {
      Object.assign(updateData, { instagram: instagram });
    }
    if (linkedin) {
      Object.assign(updateData, { linkedin: linkedin });
    }
    if (website) {
      Object.assign(updateData, { website: website });
    }
    if (profilePicture) {
      Object.assign(updateData, { profile_image_url: `https://api.retnecms.com/public/profile-image/${profilePicture.uuid}.${profilePicture.type}` });
    }

    const data = await User_Profile.update(updateData, {
      where: {
        user_uuid: user_uuid
      },
      transaction
    })
    await transaction.commit();
    res.json({
      data: data,
      message: `User Profile ${message.SUCCESSFULLY_UPDATED}`
    });
  } catch (error) {
    await transaction.rollback();
    next(error)
  }
}


module.exports = {
  getUser,
  getUserById,
  getUserAll,
  createUser,
  updateUser,
  getByUsername,
  deleteUser,
  createUserProfile,
  updateUserProfile
};