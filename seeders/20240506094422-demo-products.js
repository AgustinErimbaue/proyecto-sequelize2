"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Smartphone Samsung Galaxy S21",
        description:
          "Smartphone Samsung Galaxy S21 con cámara de 108 MP y pantalla AMOLED de 6.2 pulgadas.",
        price: 1000,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laptop Dell XPS 15",
        description:
          "Portátil Dell XPS 15 con procesador Intel Core i7, pantalla táctil 4K de 15.6 pulgadas y tarjeta gráfica NVIDIA GeForce GTX 1650.",
        price: 1800,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smartwatch Apple Watch Series 7",
        description:
          "Smartwatch Apple Watch Series 7 con pantalla siempre activa, monitor de salud avanzado y resistencia al agua.",
        price: 400,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Auriculares Sony WH-1000XM4",
        description:
          "Auriculares inalámbricos Sony WH-1000XM4 con cancelación de ruido, control táctil y hasta 30 horas de duración de la batería.",
        price: 350,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Televisor LG OLED55C1",
        description:
          "Televisor LG OLED55C1 con tecnología OLED, resolución 4K, Dolby Vision IQ y sonido Dolby Atmos.",
        price: 2000,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smartphone Google Pixel 6 Pro",
        description:
          "Smartphone Google Pixel 6 Pro con cámara de 50 MP, procesador Google Tensor y pantalla Fluid AMOLED de 6.7 pulgadas.",
        price: 900,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laptop MacBook Pro 14",
        description:
          "Portátil MacBook Pro 14 con chip M1 Pro de Apple, pantalla Retina XDR de 14 pulgadas y hasta 32 GB de memoria unificada.",
        price: 2200,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pulsera de actividad Fitbit Charge 5",
        description:
          "Pulsera de actividad Fitbit Charge 5 con monitorización del ritmo cardíaco, GPS integrado y hasta 7 días de autonomía.",
        price: 150,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Altavoz Bluetooth JBL Flip 5",
        description:
          "Altavoz Bluetooth JBL Flip 5 resistente al agua, con batería de hasta 12 horas de duración y sonido de alta calidad.",
        price: 120,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Televisor Samsung QN90A",
        description:
          "Televisor Samsung QN90A con tecnología QLED, resolución 8K, Quantum HDR 32X y procesador Quantum 4K.",
        price: 3000,
        categoryId: 5,
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
