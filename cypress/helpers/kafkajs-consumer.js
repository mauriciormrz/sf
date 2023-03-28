const { Kafka, logLevel } = require("kafkajs");
const fs = require("fs");

const { writeJSON, logMessage } = require("../helpers/utilities");
const {
  TOPIC_ORDER_SHIPPED,
  TOPIC_ORDER_UPDATED,
  TOPIC_SKU_PRICE_CHANGED,
  TOPIC_SKU_UPDATED,
  TOPIC_YL_ACCOUNT_CREDIT_BALANCE_UPDATED,
  TOPIC_YL_ACCOUNT_CREDIT_LEDGER,
  TOPIC_YL_ACCOUNT_LOYALTY_LEDGER,
  TOPIC_YL_ACCOUNT_PAYMENT_ACH,
  TOPIC_YL_ACCOUNT_PAYMENT_CARD,
  TOPIC_YL_ACCOUNT_PAYMENT_PAYPAL,
  TOPIC_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED,
  TOPIC_YL_ACCOUNT_SUBSCRIPTION,
  TOPIC_YL_ACCOUNT_UPDATED,
  TOPIC_YL_CUSTOMER_ADDRESS_UPDATED,
  TOPIC_ORDER_PLACED_PROCESSED,
} = require("./topics-messages");

const brokers = [process.env.KAFKA_BROKER];
const clientId = "kafkajs";

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
  },
});

const consumer = kafka.consumer({
  groupId: clientId,
  //minBytes: 5,
  //maxBytes: 1e6,
  //maxWaitTimeInMs: 5000, // wait for at most 3 seconds before receiving new data
});

const consume = async () => {

  await consumer.connect(); // first, we wait for the client to connect and subscribe to the given topic
  await consumer.subscribe({
    topics: [
      TOPIC_ORDER_SHIPPED,
      TOPIC_ORDER_UPDATED,
      TOPIC_SKU_PRICE_CHANGED,
      TOPIC_SKU_UPDATED,
      TOPIC_YL_ACCOUNT_CREDIT_BALANCE_UPDATED,
      TOPIC_YL_ACCOUNT_CREDIT_LEDGER,
      TOPIC_YL_ACCOUNT_LOYALTY_LEDGER,
      TOPIC_YL_ACCOUNT_PAYMENT_ACH,
      TOPIC_YL_ACCOUNT_PAYMENT_CARD,
      TOPIC_YL_ACCOUNT_PAYMENT_PAYPAL,
      TOPIC_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED,
      TOPIC_YL_ACCOUNT_SUBSCRIPTION,
      TOPIC_YL_ACCOUNT_UPDATED,
      TOPIC_YL_CUSTOMER_ADDRESS_UPDATED,
      TOPIC_ORDER_PLACED_PROCESSED
    ],fromBeginning: false
  })


  await consumer.run({
    eachMessage: async({ topic, message }) => {
      logMessage(topic,message);
    },

  });
};

writeJSON([]);

module.exports = consume;
//INSERT INTO cmsuser.CustomerChangeQueue (recordid) VALUES (5010);
