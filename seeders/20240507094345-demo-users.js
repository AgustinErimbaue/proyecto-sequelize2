"use strict";
/*HAY QUE HACER seeder all*/
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Johnson",
        email: "michael@example.com",
        password: "password789",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
