const fs = require("fs");
const { exit } = require("process");


const { getMessageInfo } = require("./topics-messages");

const pathJSON = process.env.CYPRESS_JSON_LOCATION;

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

const logMessage = (topic, message) => {
  if (message.value === null) {
    return;
  }
  console.log({
    key: message.key.toString(),
    timestamp: message.timestamp,
    topic: topic,
  })

  const str = message.value.toString().replaceAll("[{", "[],").replaceAll("{", "").replaceAll("}", "").replaceAll("\\", "").replaceAll("\"", "");
  const words = str.split(',');

  const messy = new Map();
  words.forEach((line) => {
    const field = line.split(":");
    messy.set(field[0], field[1]);
  });

  const map = new Map([...messy].sort());
  const obj = Object.fromEntries(map);
  let jsonString = JSON.stringify(obj);
  jsonString = jsonString.replaceAll("{", "").replaceAll("}", "")

  try {
    const { messages } = readJSON();
    let { contract, recordid } = getMessageInfo(topic, message.headers, map);
    const timestamp = message.timestamp.toString();

    const userObj = JSON.parse(`{"contract": "${contract}","recordId": "${recordid}","timestamp": ${timestamp},${jsonString}}`);

    messages.push(userObj);
    writeJSON(messages);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  writeJSON,
  readJSON,
  logMessage
};

