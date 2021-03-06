const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const db = require("./db");
const memes = require("./routes/memes");

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

// Use Routes
app.use("/memes", memes);

//Use and serve swagger api docs
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Use and serve static assets
app.use(express.static(__dirname + "/view/"));
app.get("/.*/", (req, res) => res.sendFile(__dirname + "/view/index.html"));

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
