const { where } = require("sequelize");
const { Product } = require("../models/index");

const ProductController = {
  async create(req, res) {
    try {
      const { name, description, price, CategoryId } = req.body;

  
      if (!name || !description || !price || !CategoryId) {
        return res.status(400).send({ error: "Todos los campos son requeridos" });
      }

      
      const newProduct = await Product.create({
        name,
        description,
        price,
        CategoryId,
      });

      res.status(201).send({ message: "Producto creado exitosamente", product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al crear el producto" });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: req.params.name,
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        model: Product,
        attributes: ["name", "category"],
      });
      res.send({ msg: "Todos los productos", products });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getByPrice(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          price: req.params.price,
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getProductsByPrice(req, res) {
    try {
      const products = await Product.findAll({
        order: [["price", "ASC"]],
      });
      res.send(products);
    } catch (error) {
      onsole.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send("Producto actualizado con éxito");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "no ha sido posible actualizado el producto" });
    }
  },
  
  async delete(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Producto eliminado");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "no ha sido posible eliminar el producto" });
    }
  },
 
};


module.exports = ProductController;
