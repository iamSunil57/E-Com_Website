import express, { Router } from "express";
import productController from "../controllers/productController";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import { multer, storage } from "../middleware/multerMiddleware";

const upload = multer({ storage: storage });
const router: Router = express.Router();
// Endpoint for creating a new product
router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    upload.single("image"),
    productController.addProduct
  )
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    productController.deleteProduct
  );

router
  .route("/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    productController.updateProduct
  );

export default router;
