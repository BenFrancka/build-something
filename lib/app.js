const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware =  require('./middleware/error.js');


const app = express();

app.use(express.json());

app.use('api/v1/inventory', require('./controllers/inventory'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
