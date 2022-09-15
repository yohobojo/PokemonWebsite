const express = require('express');
const cors = require('cors');

const app = express();
var corsOptions = {
  origin: 'http://127.0.0.1:5500',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
require('./app/routes/db.routes.js')(app);

app.listen(8080, () => {
  console.log('server is listening on port 8080');
});
