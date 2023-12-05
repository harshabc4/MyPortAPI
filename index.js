const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');
const PORT = process.env.PORT || 2121;

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const app = express();
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require("dotenv").config();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongobd
let db,
  dbConnectionStr = process.env.DB_STRING

mongoose.connect(dbConnectionStr);

// data schema
const testSchema = {
  text: String
}

const testItem = mongoose.model("testItem", testSchema, "testItems");

try {
  testItem.create({ text: "asdf" });
}
catch {
console.error();
}

/**
 * @swagger
 * /getPosts:
 *   get:
 *     summary: Get posts
 *     description: Retrieve a list of posts
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 - postId: 1
 *                   title: 'Post 1'
 *                 - postId: 2
 *                   title: 'Post 2'
 */
app.get("/getPosts", async (req, res) => {
  try {
    const data = await getLastKey();
    /**
     * @swagger
     * /getPosts:
     *   get:
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         description: Access token
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               message: Success
     *               data:
     *                 - postId: 1
     *                   title: 'Post 1'
     *                 - postId: 2
     *                   title: 'Post 2'
     */
    console.log("data coming");
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



async function getLastKey() {
  console.log("getLastKey");
  return new Promise((resolve, reject) => {
    testItem.findOne().sort({ _id: -1 })
      .then(data => {
        // Assuming data is what you want to resolve with
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}