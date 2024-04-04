const express = require("express");
const app = express();
const cors = require('cors');
const stockRoutes = require("./routes/stockRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(cors());

const PORT = process.env.PORT || 3009;

app.use("/api/stocks", stockRoutes.router);
app.use("/api/", authRoutes.router);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
