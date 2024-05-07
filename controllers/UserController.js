const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ error: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .send({ message: "Usuario registrado exitosamente", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al registrar usuario" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).send({ error: "Usuario no encontrado" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.status(200).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al iniciar sesión" });
    }
  },

  async getUserWithOrdersAndProducts(req, res) {
    try {
      const userId = req.user.id; // Suponiendo que la información del usuario está disponible en req.user después de la autenticación con JWT

      // Obtener la información del usuario con sus pedidos y productos asociados
      const userWithOrdersAndProducts = await User.findByPk(userId, {
        include: [
          {
            model: Order,
            include: [Product],
          },
        ],
      });

      res.status(200).send(userWithOrdersAndProducts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          error: "Error al obtener la información del usuario y sus pedidos",
        });
    }
  },
};

module.exports = UserController;
