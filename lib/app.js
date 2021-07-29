const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/inventory', require('./controllers/inventory'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
