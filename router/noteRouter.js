const express=require('express');
const router=express.Router();
const noteController=require("../controllers/noteController");
const authToken = require('../middlewares/authtokenMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - content
 *         - category 
 *       properties:
 *         id:
 *           type: STRING
 *           description: id of note
 *         title:
 *           type: STRING
 *           description: title of note
 *         content:
 *           type: STRING
 *           descripton: content of note
 *         category:
 *           type: STRING
 *           description: category of note
 *         type:
 *           type: STRING
 *           description: type of note
 *         filename:
 *           type: INTEGER
 *           description: Name of note      
 *       example:
 *         id: 6320316039966b61cff5539c
 *         title:  My First Note for Garv
 *         content: Hello GUYSS!!
 *         category: Garv
 *         type: file
 *         filename: 110212_123451 
 */
/**
  * @swagger
  *  tags:
  *    name: Notes
  *    description: notes of users
  */

/**
 * @swagger
 * /api/note:
 *   get:
 *     summary: Returns all note
 *     tags: {Notes}
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: the list of the notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: some error occured while retrieving the data  
 */
router.get('/',authToken,noteController.getNotes);
/**
 * @swagger
 * 
 * /api/note/create:
 *   post:
 *     summary: Create a new note
 *     tags: {Notes}
 *     security:
 *	     - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The note was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       500:
 *         description: Some server error
 */
router.post('/create',authToken,noteController.createnote);
/**
 * @swagger
 * /api/note/{id}:
 *   get:
 *     summary: gets note by id
 *     tags: {Note}
 *     security:
 *	     - jwt: []
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of note
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: notes by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: note can not be found
 */


 router.get("/:id",noteController.getnotebyId);
/**
 * @swagger
 * /api/note/{id}:
 *   put:
 *     summary: updates note by id
 *     tags: {Note}
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         decsription: The note was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: note was not found.
 *       500:
 *         description: Some errors happend.
 *
 */

router.put("/:id",authToken,noteController.updateNote);
/**
 * @swagger
 *  /api/note/{id}:
 *    delete:
 *      summary: removes post from array
 *      tags: {Note}
 *      security:
 *	     - jwt: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: note id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The note was deleted
 *        404:
 *          description: The note was not found
 *
 */
router.delete("/:id",authToken,noteController.deleteNote);
/**
 * @swagger
 * 
 * /api/note/create-type:
 *   post:
 *     summary: Create a new note
 *     tags: {Notes}
 *     security:
 *	     - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The note was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       500:
 *         description: Some server error
 */
router.post('/create-type',authToken,noteController.createtype);
router.get('/download/excel',authToken,noteController.working);

module.exports=router;