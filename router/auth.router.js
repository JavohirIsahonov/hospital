const { Router } = require("express");
const router = Router();
const { registerUser, loginUser, deleteUserById, allUsers } = require("../controller/auth.controller");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [patient, doctor]
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input or missing fields.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid email or password.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /auth/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: User ID is required.
 */
router.delete("/delete/:id", deleteUserById);

/**
 * @swagger
 * /auth/all:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users.
 */
router.get("/all", allUsers);

module.exports = router;
