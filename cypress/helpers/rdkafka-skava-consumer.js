const Transform = require('stream').Transform;
const Kafka = require('node-rdkafka');

const { logMessage } = require("./utilities");
const {
  TOPIC_ORDER_PLACED_PROCESSED,
} = require("./topics-messages");

const run = async () => {
  var stream = Kafka.KafkaConsumer.createReadStream({
    'group.id': 'rdkafka-skava-consumer',
    'api.version.request': true,
    'bootstrap.servers': process.env.KAFKA_BROKER,
    'sasl.mechanism': process.env.SASL_MECHANISM,
    'sasl.password': process.env.SASL_PASSWORD,
    'sasl.username': process.env.SASL_USERNAME,
    'security.protocol': "SASL_SSL",
    'auto.offset.reset': "latest",
    'ssl.ca.location': process.env.SSL_LOCATION
  }, {}, {
    topics: [
      TOPIC_ORDER_PLACED_PROCESSED
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
