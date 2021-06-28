const V = require("voca");
module.exports = function createEntryPointFile(entityNames) {
  const libraries = entityNames
    .map(entity => {
      return `
  const ${V.camelCase(entity)}Router = require("./routes/${V.camelCase(
        entity
      )}.route");`;
    })
    .join("");

  const routeIntegration = entityNames
    .map(entity => {
      return `
      app.use("/api/${V.camelCase(entity)}", ${V.camelCase(entity)}Router);`;
    })
    .join("");

  return `
  /**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const DBNAME = "sample"; //change it to your db name
const connectionString = \`mongodb://localhost:27017/\${DBNAME}\`; //change it to your db connection String
mongoose.connect(connectionString, { useNewUrlParser: true }).then(a => {});

//routes
${libraries}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to api!" });
});
app.get("/images/*", (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

//Entity Routes
${routeIntegration}

const port = process.env.port || 3353;
const server = app.listen(port, () => {
  console.log(\`Listening at http://localhost:\${port}/api\`);
});
server.on("error", console.error);

    `;
};
