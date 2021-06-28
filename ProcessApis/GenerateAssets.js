const { ProcessEntity } = require("./ProcessEntity");

async function GenerateAssets(entities, processFiles, dir) {
  if (entities) {
    console.log(entities.map(a => a.entitySchema));

    for (const entity of entities) {
      if (processFiles) ProcessEntity(entity, dir);
    }
  }
  if (processFiles) {
    return {
      entities
    };
  }
  return {
    entities
  };
}
module.exports = { GenerateAssets };
