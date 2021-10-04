const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const message = require('../config/message');

const AppError = require("../utils/appError");
const User = require('../models').User;
const Role = require('../models').Role;
const User_Profile = require('../models').User_Profile;

const signin = async (req, res, next) => {

  try {

    const user = await User.findOne({
      where: {
        email: req.body.email.toLowerCase()
      }
    });


    if (!user) {
      throw new AppError(404, message.EMAIL_NOT_FOUND);
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      throw new AppError(401, message.WRONG_PASSWORD);
    }
    // Get Role
    const role = await Role.findByPk(user.role_uuid);
    // Get user profile
    const userProfile = User_Profile.findOne({
      where: {
        user_uuid: user.uuid
      }
    });


    console.log('====================================');
    console.log(role);
    console.log('====================================');

    // Create token with JWT
    let token = jwt.sign({
      user_id: user.uuid,
      role: role.role,
      username: user.username,
      name: userProfile.name
    }, process.env.JWT_SECRET, {
      expiresIn: 86400 //24H
    });
    // End create token

    await User.update({ jwt_token: token },
      {
        where: { uuid: user.uuid }
      }
    );

    res.send({
      accessToken: token,
      role: role.role,
      message: 'Login successfully'
    });

  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    let tokenHeader = req.headers['authorization'];
    let tokenParams = req.body.token
    if (!tokenHeader && !tokenParams) {
      throw new AppError(500, 'Required token access');
    }
    
    if (tokenHeader) token = tokenHeader.split(' ')[1];
    else token = tokenParams;
    console.log(tokenParams)
    if (!token) {
      throw new AppError(403, 'No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new AppError(401, err);
      }

      // Check token on Field jwt_token apakah sama atau sudah berganti.
      // Digunakan untuk melakukan single device login
      User.findOne({
        where: {
          jwt_token: token
        }
      }).then(response => {

        if (!response) {
          throw new AppError(401, 'Token is not valid');
        }

        req.decoded = decoded;
        next();


      }).catch(err => {
        next(err);
      });
    });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  signin,
  verifyToken
};