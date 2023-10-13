const express = require("express");
require("dotenv").config();
const app = express();
const router = require("./src/routes/index");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./openapi.json");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
