"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("reading_lists", [
      {
        user_id: 1,
        blog_id: 3
      },
      {
        user_id: 2,
        blog_id: 2
      },
      {
        user_id: 3,
        blog_id: 1
      },
      {
        user_id: 1,
        blog_id: 1
      },
      {
        user_id: 2,
        blog_id: 1
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("reading_list", null, {});
  }
};
