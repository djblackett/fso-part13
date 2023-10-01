"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwords = ["password1", "password123", "password456", "password789"];
    const hashedPasswords =  await Promise.all(passwords.map(password => bcrypt.hash(password, 10)));
    return queryInterface.bulkInsert("users", [{
      name: "Doe",
      username: "example@example.com",
      password: hashedPasswords[0],
    },
    {
      name: "John Doe",
      username: "john.doe@example.com",
      password: hashedPasswords[1],
    },
    {
      name: "Jane Doe",
      username: "jane.doe@example.com",
      password: hashedPasswords[2],
    },
    {
      name: "Sam Smith",
      username: "sam.smith@example.com",
      password: hashedPasswords[3],
    }


    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
