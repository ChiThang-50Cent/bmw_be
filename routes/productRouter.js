const router = require("express").Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const { verify_cs_token } = require("../middleware/csrfProtection");

router
    .route("/products")
    .get(productController.getProducts)
    .post(auth, authAdmin, verify_cs_token, productController.createProduct);

router
    .route("/products/:id")
    .delete(productController.deleteProduct)
    .put(auth, authAdmin, verify_cs_token, productController.updateProduct);

module.exports = router;