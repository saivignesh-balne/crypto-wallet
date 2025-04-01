const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/gas', require('./api/gas'));
app.use('/api/balance', require('./api/balance'));

app.listen(5000, () => console.log('API running on port 5000'));