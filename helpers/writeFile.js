const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function writeJSONFile(filename, content) {
  console.log(filename, content);
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(`changes saved to file ${filename}....`);
}
const getNewId = () => {
  return uuidv4();
};
module.exports = {
  writeJSONFile,
  getNewId,
};
