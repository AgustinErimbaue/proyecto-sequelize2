const bcrypt = require("bcrypt");
const { User, Token, Order, Product } = require("../models/index");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
      }

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
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .send({ message: "Usuario o contraseña incorrectos" });
        }
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .send({ message: "Usuario o contraseña incorrectos" });
        }
        let token = jwt.sign({ id: user.id }, jwt_secret);
        Token.create({ token, UserId: user.id });
        res.send({ message: "Bienvenid@ " + user.name, user, token });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ error: "Error al iniciar sesión" });
      });
  },

  async getUserWithOrdersAndProducts(req, res) {
    try {
      const userId = req.user.id; 
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
      res.status(500).send({
        error: "Error al obtener la información del usuario y sus pedidos",
      });
    }
  },
  async logout(req, res) {
    try {
      const user = req.user;

      
      await Token.destroy({
        where: {
          UserId: user.id,
        },
      });

      res.status(200).send({ message: "Logout exitoso" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al realizar el logout" });
    }
  },
};

module.exports = UserController;
