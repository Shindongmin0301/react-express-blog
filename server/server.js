const express = require('express');
const app = express();
const PORT = 8080;

const cookieParser = require('cookie-parser');
const router = require('./src/routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
