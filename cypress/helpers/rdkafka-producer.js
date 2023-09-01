const Kafka = require('node-rdkafka');
const fs = require("fs");


const sendMessage = async (topic, payload) => {
  try {

    var producer = new Kafka.Producer({
      'group.id': 'rdkafka-producer',
      'api.version.request': true,
      'bootstrap.servers': process.env.KAFKA_BROKER,
      'sasl.mechanism': process.env.SASL_MECHANISM,
      'sasl.password': process.env.SASL_PASSWORD,
      'sasl.username': process.env.SASL_USERNAME,
      'security.protocol': process.env.SECURITY_PROTOCOL,
      'ssl.ca.location': process.env.SSL_LOCATION,
      'dr_cb': true
    });

    //const request_topic = 'clone.orders.public.requests.orders';
    const request_topic = process.env.TOPIC_PREFIX + topic + ".public.requests." + topic;

    producer.on('delivery-report', function (err, report) {
      console.log('deliver: ' + JSON.stringify(report.topic));
    });

    producer.on('ready', function (arg) {
      console.log('producer ready');

      const value = Buffer.from(fs.readFileSync("./cypress/fixtures/payloads/" + payload + ".json", "utf8"));
      const key = "";
      const partition = -1;
      const headers = [
        {
          "Container:Manifest:contents_type": "SkavaUs.OrderPlaced"
        }
      ]

      producer.produce(request_topic, partition, value, key, Date.now(), "", headers);

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
    return null;
  } catch (err) {
    console("Error ==>" + err);
    return err
  }


}

module.exports = {
  sendMessage,
};