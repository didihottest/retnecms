const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError");
const User = require('../models').User;
const Role = require('../models').Role;
const User_Profile = require('../models').User_Profile;
module.exports = {
  WhoIs(req, res, next) {
    try {
      let tokenHeader = req.headers['authorization'];

      if (!tokenHeader) {
        throw new AppError(500, 'Required token access');
      }

      let token = tokenHeader.split(' ')[1];
      if (!token) {
        throw new AppError(403, 'No token provided');
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new AppError(401, err);
        }
        req.decoded = decoded;
        return User.findByPk(req.decoded.user_id, {
          include: [
            {
              model: Role,
              as: 'role',
              attributes: ['role']
            },
            {
              model: User_Profile,
              as: 'user_profile',
              attributes: ['name', 'profile_image_url']
            },
          ]
        })
          .then(user => {
            res.json({
              data: user
            });
          })
          .catch(err => {
            next(err);
          });
      });
    } catch (err) {
      next(err);
    }
  }
};