'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Profile.belongsTo(models.User, {
        foreignKey: "user_uuid",
        as: "user"
      })
    }
  };
  User_Profile.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quotes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    google_plus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'user_profiles',
    modelName: 'User_Profile',
  });
  return User_Profile;
};