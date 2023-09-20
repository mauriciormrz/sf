const Transform = require('stream').Transform;
const Kafka = require('node-rdkafka');

const { logMessage } = require("./utilities");
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
  TOPIC_ACCOUNTS,
  TOPIC_ORDERS_PROCESSED,
  
} = require("./topics-messages");

const run = async () => {
  var stream = Kafka.KafkaConsumer.createReadStream({
    'group.id': 'rdkafka-consumer',
    'api.version.request': true,
    'bootstrap.servers': process.env.KAFKA_BROKER,
    'sasl.mechanism': process.env.SASL_MECHANISM,
    'sasl.password': process.env.SASL_PASSWORD,
    'sasl.username': process.env.SASL_USERNAME,
    'security.protocol': process.env.SECURITY_PROTOCOL,
    'auto.offset.reset': "latest",
    'ssl.ca.location': process.env.SSL_LOCATION
  }, {}, {
    topics: [
      TOPIC_ORDER_SHIPPED,
      TOPIC_ORDER_UPDATED,
      TOPIC_SKU_PRICE_CHANGED,
      TOPIC_SKU_UPDATED,
      //TOPIC_YL_ACCOUNT_CREDIT_BALANCE_UPDATED,
      //TOPIC_YL_ACCOUNT_CREDIT_LEDGER,
      //TOPIC_YL_ACCOUNT_LOYALTY_LEDGER,
      TOPIC_YL_ACCOUNT_PAYMENT_ACH,
      TOPIC_YL_ACCOUNT_PAYMENT_CARD,
      TOPIC_YL_ACCOUNT_PAYMENT_PAYPAL,
      TOPIC_YL_ACCOUNT_POINT_VALUE_BALANCE_UPDATED,
      //TOPIC_YL_ACCOUNT_SUBSCRIPTION,
      //TOPIC_YL_ACCOUNT_UPDATED,
      TOPIC_YL_CUSTOMER_ADDRESS_UPDATED,
      TOPIC_ACCOUNTS,
      TOPIC_ORDERS_PROCESSED,
    ],
    waitInterval: 0,
    objectMode: true
  });

  stream.on('data', function (message) {
    logMessage(message.topic,message);
  });

  stream.on('error', function (err) {
    console.log(err);
    process.exit(1);
  });

  stream.consumer.on('event.error', function (err) {
    console.log(err);
  })
};

module.exports = run;


// brew install librdkafka
// brew link python
// xcode-select --install
// https://github.com/Blizzard/node-rdkafka/blob/master/README.md
// https://github.com/Blizzard/node-rdkafka/blob/master/examples/producer.md
// https://stackoverflow.com/questions/72854644/nodejs-kafka-producer-not-able-to-send-messages
// https://dsinecos.github.io/blog/Learning-Kafka-Writing-a-simple-producer-in-Nodejs