const { Kafka, logLevel } = require("kafkajs");
const { writeJSON, readJSON } = require("../helpers/utilities");

const brokers = [process.env.KAFKA_BROKER];

const fs = require("fs");

const clientId = "cy-kafka";

const MSG_CUSTOMER = "YLAccountUpdated";
const TOPIC_CUSTOMER = "skava.internal.events.yl-customers";

const MSG_ORDER_PLACED = "OrderPlaced";
const TOPIC_ORDER_PLACED = "orders.public.requests.orders";

const MSG_ORDER_SHIPPED = "OrderShipped";
const TOPIC_ORDER_SHIPPED = "skava.internal.events.yl-orders-shipped";


//const topic = process.env.TOPIC_PREFIX + ".skava.internal.events.yl-customers";
const topic = process.env.TOPIC_PREFIX + TOPIC_ORDER_SHIPPED;

const kafka = new Kafka({
  clientId,
  brokers,
  logLevel: logLevel.NOTHING,
  ssl: {
    rejectUnauthorized: false,
    cert: fs.readFileSync(process.env.SSL_LOCATION, "utf-8"),
  },
  sasl: {
    mechanism: process.env.SASL_MECHANISM,
    username: process.env.SASL_USERNAME,
    password: process.env.SASL_PASSWORD,
  }
});

const consumer = kafka.consumer({
  groupId: clientId,
  minBytes: 5,
  maxBytes: 1e6,
  maxWaitTimeInMs: 3000 // wait for at most 3 seconds before receiving new data
});

const consume = async () => {
  await consumer.connect(); // first, we wait for the client to connect and subscribe to the given topic
  await consumer.subscribe({ topic, fromBeginning: false });
  //await consumer.subscribe({ 'clone.orders.public.requests.orders', fromBeginning: false });
  //await consumer.subscribe({ 'clone.skava.internal.events.yl-orders-shipped', fromBeginning: false });

  //await consumer.run({
  //  eachMessage: async ({ topic, partition, message }) => {
  //      console.log({
  //          key: message.key.toString(),
  //          value: message.value.toString(),
  //          headers: message.headers,
  //      })
  //  },
  //})

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      let { key, value, headers } = { message };
      // this function is called every time the consumer gets a new message
      console.log({
        key: message.key.toString(),
        value: message.timestamp.toString(),
        topic: topic
        //message: message.headers['X-Publisher/Application'].toString() ,
      });

      try {
        const { messages } = readJSON();
        let userObj = JSON.parse(
          `{"message": "${getMessage(topic)}","value": ${message.value}}`
        );

        messages.push(userObj);
        writeJSON(messages);
      } catch (err) {
        console.log(err.message);
      }
    }
  });
};

const getMessage = topic => {

  if (topic.includes(TOPIC_CUSTOMER)) {
    return MSG_CUSTOMER;
  }

  if (topic.includes(TOPIC_ORDER_PLACED)) {
    return MSG_ORDER_PLACED;
  }

  if (topic.includes(TOPIC_ORDER_SHIPPED)) {
    return MSG_ORDER_SHIPPED;
  }

  return MSG_CUSTOMER;
};

writeJSON([]);

module.exports = consume;