const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Description of your API',
        },
    },
    //   apis: ['./routes/*.js'], // Path to the API routes
    apis: ['./index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
