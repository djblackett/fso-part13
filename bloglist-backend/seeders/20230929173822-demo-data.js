"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {

    const passwords = ["password1", "password123", "password456", "password789"];
    const hashedPasswords =  passwords.map(password => bcrypt.hash(password, 10));

    return queryInterface.bulkInsert("users", [{
      name: "Doe",
      username: "example@example.com",
      password: hashedPasswords[0],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "John Doe",
      username: "john.doe@example.com",
      password: hashedPasswords[1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Jane Doe",
      username: "jane.doe@example.com",
      password: hashedPasswords[2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Sam Smith",
      username: "sam.smith@example.com",
      password: hashedPasswords[3],
      createdAt: new Date(),
      updatedAt: new Date()
    }


    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
