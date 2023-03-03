const Transform = require('stream').Transform;
const Kafka = require('node-rdkafka');

async function run() {
  var stream = Kafka.KafkaConsumer.createReadStream({
    'group.id': 'librd-test2',
    'api.version.request': true,
    'bootstrap.servers': "pkc-lgk0v.us-west1.gcp.confluent.cloud:9092",
    'sasl.mechanism': "PLAIN",
    'sasl.password': "OoFuTeBJBoitrwl53HoKZtXal4Vnnku5Dsm0f7CVnl4cGZJrp87d+7Zz0dF8eC8o",
    'sasl.username': "SMJXDBRARWATY3E7",
    'security.protocol': "SASL_SSL",
    'ssl.ca.location': "./cypress/fixtures/kafkacert.pem"
  }, {}, {
    topics: ['clone.legacy.internal.events.order-id-changes',
    'clone.legacy.internal.events.customer-id-changes',
  ],
    waitInterval: 0,
    objectMode: false
  });

  stream.on('error', function(err) {
    if (err) console.log(err);
    process.exit(1);
  });

//   stream
//     .pipe(process.stdout);

  stream.on('data', function(message) {
    console.log('Got message');
    console.log(message.toString());
  });

  stream.on('error', function(err) {
    console.log(err);
    process.exit(1);
  });

  stream.consumer.on('event.error', function(err) {
    console.log(err);
  })
}

run();
