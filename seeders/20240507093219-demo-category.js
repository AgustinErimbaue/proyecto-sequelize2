"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      { name: "Laptops", createdAt: new Date(), updatedAt: new Date() },
      { name: "Smartphones", createdAt: new Date(), updatedAt: new Date() },
      { name: "Wearable", createdAt: new Date(), updatedAt: new Date() },
      { name: "Audio", createdAt: new Date(), updatedAt: new Date() },
      { name: "Televisores", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
