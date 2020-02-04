const PORT = 5000;

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const teamRoutes = require('./routes/team.routes');
const activityRoutes = require('./routes/activity.routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/api", userRoutes);
app.use("/api", teamRoutes);
app.use("/api", activityRoutes);

app.listen(PORT, () => { console.log("CRUDLAX Back End RUNNING") });
