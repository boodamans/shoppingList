const express = require('express');
const app = express();
const port = 3000;

const router = require('./router');
const items = require('./fakeDb.js')

// Middleware
app.use(express.json());

// Routes
app.use('/items', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});