const fs = require("fs");

function GenerateRelatedFolders(dir) {
  if (!fs.existsSync(dir + "/controllers")) {
    fs.mkdirSync(dir + "/controllers", { recursive: true });
  }
  if (!fs.existsSync(dir + "/routes")) {
    fs.mkdirSync(dir + "/routes", { recursive: true });
  }
  if (!fs.existsSync(dir + "/schemas")) {
    fs.mkdirSync(dir + "/schemas", { recursive: true });
  }
}
module.exports = { GenerateRelatedFolders };
