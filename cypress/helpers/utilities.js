const fs = require("fs");

const pathJSON = "./cypress/fixtures/topics.json";

const readJSON = () => {

  const template = {
    messages: [],
  };

  try {
    const data = fs.readFileSync(pathJSON, "utf8");
    if (data.length === 0) {
      return template;
    }
  } catch (error) {
    fs.writeFileSync(pathJSON, JSON.stringify(template, null, 4), "utf8");
  }

  const data = fs.readFileSync(pathJSON, "utf8");
  return JSON.parse(data);
};

const writeJSON = (data) => {

  const template = {
    messages: data,
  };

  fs.writeFileSync(pathJSON, JSON.stringify(template, null, 4), "utf8");
};


module.exports = {
  readJSON,
  writeJSON,
};