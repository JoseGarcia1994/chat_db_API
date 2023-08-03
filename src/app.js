const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes');
const errorRoutes = require('./routes/error.routes');

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

apiRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome to my server');
});

// middleware de error
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listing to port ${PORT}`);
});