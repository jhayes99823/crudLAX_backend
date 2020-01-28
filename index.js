const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(PORT, () => { console.log("CRUDLAX Back End RUNNING") });