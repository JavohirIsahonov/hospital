const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Javohir API',
            version: '1.0.0',
            description: 'Hospital Management API Documentation',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./router/*.js'], // Path to API documentation comments in routers
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Routers
const authRouter = require('./router/auth.router');
app.use('/auth', authRouter);

const hospitalRouter = require('./router/hospital.router');
app.use('/hospital', hospitalRouter);

// Start Server
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
