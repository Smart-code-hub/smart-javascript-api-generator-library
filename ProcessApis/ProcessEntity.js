const { ProcessSchema } = require("smart-javascript-api-schema-library");
const {
  ProcessRoute,
  GetHelpFile
} = require("smart-javascript-api-router-library");
const fs = require("fs");
const path = require("path");

const {
  ProcessController
} = require("smart-javascript-api-Controller-library");

function ProcessEntity(entity, dir) {
  const schemadata = ProcessSchema(entity);
  const controllerdata = ProcessController(entity);

  const routedata = ProcessRoute(entity);
  const helpData = GetHelpFile(entity);
  console.log(schemadata);
  fs.writeFileSync(
    path.join(dir, `schemas/${entity.name.toLowerCase()}.schema.js`),
    schemadata
  );
  fs.writeFileSync(
    path.join(dir, `routes/${entity.name.toLowerCase()}.route.js`),
    routedata
  );
  fs.writeFileSync(
    path.join(dir, `controllers/${entity.name.toLowerCase()}.controller.js`),
    controllerdata
  );
  fs.writeFileSync(
    path.join(dir, `${entity.name.toLowerCase()}.instruction.txt`),
    helpData
  );
}

module.exports = { ProcessEntity };
