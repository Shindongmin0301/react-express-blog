// Moudle
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const homeRouter = require('./src/routes/router.home');
const blogRouter = require('./src/routes/router.blog');

// Set
app.use(require('cors')());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

//Route
app.use('/api', homeRouter);
app.use('/api/blog', blogRouter);

app.listen(8080, () => {
  console.log('Listening on 8080');
});

module.exports = app;
