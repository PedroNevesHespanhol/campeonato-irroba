import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campeonato API',
      version: '1.0.0',
      description: 'API documentation for Campeonato application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/routes.js', './controllers/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;