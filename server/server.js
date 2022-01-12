require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// routers

const homeRouter = require('./routes/home');
const errorRouter = require('./routes/error-page');

// BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//displaying pages using routers

app.use('/', homeRouter);
app.use('/*', errorRouter);


app.listen(PORT, () => {
  console.log(`server is lisning on PORT: ${PORT}`);
});