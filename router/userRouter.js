const express=require('express');
const router=express.Router()
const userController=require("../controllers/userController");
const app=express();
app.use(express.json());
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: STRING
 *           description: id of note
 *         name:
 *           type: STRING
 *           description: name of user
 *         email:
 *           type: STRING
 *           descripton:  email of user
 *         password:
 *           type: STRING
 *           description: password of user
 *          
 *               
 *       example:
 *         id: 6320316039966b61cff5539c
 *         name: Garv
 *         email: Garv@example.com
 *         
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new User
 *     tags: {User}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/",userController.registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a User
 *     tags: {User}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */



router.post("/login",userController.loginUser)

module.exports=router;