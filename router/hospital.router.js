const express = require("express");
const router = express.Router();
const { createHospital, getAllHospitals, getUserHospitals, getHospitalById, updateHospital, deleteHospital } = require("../controller/hospital.controller");

/**
 * @swagger
 * /hospital/create:
 *   post:
 *     summary: Create a hospital record
 *     description: Adds a new hospital record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hospital record created successfully.
 *       400:
 *         description: Missing required fields.
 */
router.post("/create", createHospital);

/**
 * @swagger
 * /hospital/all:
 *   get:
 *     summary: Get all hospital records
 *     responses:
 *       200:
 *         description: List of all hospital records.
 */
router.get("/all", getAllHospitals);

/**
 * @swagger
 * /hospital/{user_id}:
 *   get:
 *     summary: Get hospitals by user ID
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of hospitals for the specified user.
 *       400:
 *         description: User ID is required.
 */
router.get("/:user_id", getUserHospitals);

/**
 * @swagger
 * /hospital/id/{id}:
 *   get:
 *     summary: Get a hospital by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hospital ID
 *     responses:
 *       200:
 *         description: Hospital details.
 *       404:
 *         description: Hospital not found.
 */
router.get("/id/:id", getHospitalById);

/**
 * @swagger
 * /hospital/update/{id}:
 *   put:
 *     summary: Update a hospital record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hospital ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hospital updated successfully.
 *       400:
 *         description: Missing required fields.
 */
router.put("/update/:id", updateHospital);

/**
 * @swagger
 * /hospital/delete/{id}:
 *   delete:
 *     summary: Delete a hospital record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hospital ID
 *     responses:
 *       200:
 *         description: Hospital deleted successfully.
 *       400:
 *         description: Hospital ID is required.
 */
router.delete("/delete/:id", deleteHospital);

module.exports = router;
