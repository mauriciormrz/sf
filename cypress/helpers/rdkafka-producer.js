const Kafka = require('node-rdkafka');
const fs = require("fs");


var producer = new Kafka.Producer({
    'group.id': 'rdkafka-producer',
    'api.version.request': true,
    'bootstrap.servers': process.env.KAFKA_BROKER,
    'sasl.mechanism': process.env.SASL_MECHANISM,
    'sasl.password':  process.env.SASL_PASSWORD,
    'sasl.username': process.env.SASL_USERNAME,
    'security.protocol': "SASL_SSL",
    'ssl.ca.location':  process.env.SSL_LOCATION,
    'dr_cb': true
  });

var topicName = 'clone.orders.public.requests.orders';

producer.on('event.log', function (log) {
  console.log(log);
});

producer.on('event.error', function (err) {
  console.error('Error from producer');
  console.error(err);
});

producer.on('delivery-report', function (err, report) {
  console.log('deliver: ' + JSON.stringify(report.topic));
});

producer.on('ready', function (arg) {
  console.log('producer ready');

  const value = Buffer.from(fs.readFileSync('./cypress/fixtures/Payload.json', "utf8"));
  const key = "";
  const partition = -1;
  const headers = [
    {
      "Container:Manifest:contents_type": "SkavaUs.OrderPlaced"
    }
  ]

  producer.produce(topicName, partition, value, key, Date.now(), "", headers);

  const pollLoop = setInterval(function () {
    producer.poll();
    clearInterval(pollLoop);
    producer.disconnect();
  }, 1000);
});

producer.on('disconnected', function (arg) {
  console.log('producer disconnected');
});

producer.connect();