const { Order, Product, ProductOrder } = require("../models/index");

const OrderController = {
  async createOrder(req, res) {
    try {
      const { products } = req.body; 
      const userId = req.user.id; 

      
      const newOrder = await Order.create({
        UserId: userId,
      });

      
      if (products && products.length > 0) {
        await Promise.all(
          products.map(async (productId) => {
            await ProductOrder.create({
              ProductId: productId,
              OrderId: newOrder.id,
            });
          })
        );
      }

      
      const orderWithProducts = await Order.findByPk(newOrder.id, {
        include: [Product], 
      });

      res.status(201).send({
        message: "Pedido creado exitosamente",
        order: orderWithProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al crear el pedido" });
    }
  },

  async getOrdersWithProducts(req, res) {
    try {
      const ordersWithProducts = await Order.findAll({
        include: [Product], 
      });

      res.status(200).send(ordersWithProducts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Error al obtener los pedidos y sus productos" });
    }
  },
};

module.exports = OrderController;
