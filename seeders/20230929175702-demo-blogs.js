"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("blogs", [
      {
        author: "Ralph D.",
        title: "Trucks and Mucks",
        url: "www.truckiedoodoo.net",
        year: 1992,
        likes: 4,
        user_id: 3
      },
      {
        author: "Emily T.",
        title: "Life in the Countryside",
        url: "www.countrysideLife.com",
        year: 2010,
        likes: 5,
        user_id: 1
      },
      {
        author: "Sophia M.",
        title: "The Joy of Cooking",
        url: "www.joyfulCooking.com",
        year: 2015,
        likes: 2,
        user_id: 2
      },
      {
        author: "John S.",
        title: "Fitness Fundamentals",
        url: "www.fitnessFundamentals.com",
        year: 2018,
        likes: 10,
        user_id: 1
      },
      {
        author: "Alex K.",
        title: "Understanding Cryptocurrency",
        url: "www.cryptoUnderstanding.com",
        year: 2021,
        likes: 0,
        user_id: 3
      },
      {
        author: "Carla G.",
        title: "Journey Through Europe",
        url: "www.europeanJourney.com",
        year: 2005,
        likes: 7,
        user_id: 2
      },
      {
        author: "Victor P.",
        title: "Intro to Quantum Physics",
        url: "www.quantumIntro.com",
        year: 2019,
        likes: 11,
        user_id: 3
      }]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("blogs", null, {});
  }
};
