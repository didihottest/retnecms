'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_profiles', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profile_image_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quotes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      google_plus: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      youtube: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_profiles');
  }
};