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
const createEntryPointFile = require("./ProcessApis/CreateEntryPoint");
const { GenerateAssets } = require("./ProcessApis/GenerateAssets");
const prettier = require("prettier");

async function createApiResources(entityList, processFiles, dirName) {
  ProcessEntryPointFile(
    dirName,
    entityList.map(a => a.name)
  );
  return await GenerateAssets(entityList, processFiles, dirName);
}

const ProcessEntryPointFile = (dirName, entityNames) => {
  const entryPointData = createEntryPointFile(entityNames);
  componentPath = `app.js`;
  try {
    fs.writeFileSync(
      path.join(dirName, componentPath),
      prettier.format(entryPointData)
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createApiResources };
