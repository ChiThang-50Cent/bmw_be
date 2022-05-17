const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const csrfp = require("../middleware/csrfProtection");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/refresh_token", userController.refreshToken);

router.get("/cs_", auth, csrfp.get_cs_token);

router.get("/infor", auth, userController.getUser);

router.patch("/addcart", auth, userController.addToCart);

router.post("/update", auth, csrfp.verify_cs_token, userController.update);

router.get("/history", auth, userController.history);

module.exports = router;