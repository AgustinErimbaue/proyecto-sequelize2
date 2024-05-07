const { Order, Product, ProductOrder } = require("../models/index");

const OrderController = {
  async createOrder(req, res) {
    try {
      const { products } = req.body; // Supongamos que los productos a agregar al pedido se reciben como un array de IDs en req.body.products
      const userId = req.user.id; // Suponiendo que la información del usuario está disponible en req.user después de la autenticación con JWT

      // Crear el pedido
      const newOrder = await Order.create({
        UserId: userId,
      });

      // Agregar los productos al pedido en la tabla ProductOrder
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

      // Obtener el pedido con los productos asociados cargados
      const orderWithProducts = await Order.findByPk(newOrder.id, {
        include: [Product], // Esto cargará los productos asociados al pedido
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
        include: [Product], // Esto cargará los productos asociados a cada pedido
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
