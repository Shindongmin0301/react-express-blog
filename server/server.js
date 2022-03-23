const express = require('express');
const app = express();
const PORT = 8080;

const router = require('./src/routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.get('/api/write', (req, res) => {
  console.log('123123');
});
app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
