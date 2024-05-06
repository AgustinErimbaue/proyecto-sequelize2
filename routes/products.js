const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/id/:id", ProductController.getById);
router.get("/name/:name", ProductController.getByName);
router.get("/price/:price", ProductController.getByPrice);
router.get("/filter/price", ProductController.getProductsByPrice);
router.put("/id/:id", ProductController.update);
router.delete("/id/:id", ProductController.delete);

module.exports = router;
