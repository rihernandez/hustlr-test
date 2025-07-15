const express = require('express');
const {
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getProductReviews,
  deleteReview,
  createProductReview,
  createProduct,
  getAdminProducts,
  createProductSimple,
  getProducts
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user_actions/auth');
const { validateProduct } = require("../middlewares/validator");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: A list of products
 *   post:
 *     summary: Create a new product (public/simple version)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Producto Test"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["63f1a9f6a1234abcd56789ef"]
 *               warranty:
 *                 type: integer
 *                 example: 1
 *               return:
 *                 type: string
 *                 example: "7 días"
 *               description:
 *                 type: string
 *                 example: "Descripción de prueba"
 *               highlights:
 *                 type: string
 *                 example: "Destacados"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 99.99
 *               availableDistricts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["district1"]
 *     responses:
 *       201:
 *         description: Product created
 */
router.route('/products')
  .get(getAllProducts)
  .post(createProductSimple);

/**
 * @swagger
 * /api/v1/products/all:
 *   get:
 *     summary: Get all products without pagination (slider)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: All products
 */
router.route('/products/all').get(getProducts);

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin product list
 */
router.route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts, validateProduct);

/**
 * @swagger
 * /admin/product/new:
 *   post:
 *     summary: Create a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Product created
 */
router.route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct, validateProduct);

/**
 * @swagger
 * /admin/product/{id}:
 *   put:
 *     summary: Update a product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     summary: Delete a product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.route('/product/:id').get(getProductDetails);

/**
 * @swagger
 * /review:
 *   put:
 *     summary: Create or update a product review
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review submitted or updated
 */
router.route('/review').put(isAuthenticatedUser, createProductReview);

/**
 * @swagger
 * /admin/reviews:
 *   get:
 *     summary: Get all reviews for a product (admin)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews
 *   delete:
 *     summary: Delete a product review (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 */
router.route('/admin/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
