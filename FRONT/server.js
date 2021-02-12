const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(__dirname);
  console.log(publicPath);
  console.log('✔ Server on live! Port: ' + port);
});