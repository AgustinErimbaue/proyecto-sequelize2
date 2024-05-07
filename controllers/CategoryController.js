const { Category, Product } = require("../models/index");

const CategoryController = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send({ msg: "Categoria creada con exito", category });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al crear la categoría" });
    }
  },
  async update(req, res) {
    try {
      await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send("Categoria actualizada con éxito");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "no ha sido posible actualizado la categoria" });
    }
  },
  async delete(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Categoria eliminado");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "no ha sido posible eliminar la categoria" });
    }
  },
  async getById(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
      res.status(200).send(category);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al obtener la categoría por ID" });
    }
  },
  async getByName(req, res) {
    try {
      const categoryName = req.params.name;
      const category = await Category.findOne({
        where: { name: categoryName },
      });

      if (!category) {
        return res.status(404).send({ error: "Categoría no encontrada" });
      }

      res.status(200).send(category);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Error al buscar la categoría por nombre" });
    }
  },
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        model: Category,
        attributes: ["name"],
      });
      res.send({ msg: "Todos las categorias", categories });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getAllWithProducts(req, res) {
    try {
      const categories = await Category.findAll({
        include: [Product],
      });
      res.send({ msg: "Todas las categorías con sus productos", categories });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al obtener las categorías con productos" });
    }
  },
};

module.exports = CategoryController;
