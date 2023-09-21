const Kafka = require('node-rdkafka');
const fs = require("fs");


const sendMessage = async (entity, topic, payload) => {
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

    const request_topic = process.env.TOPIC_PREFIX + entity + ".public.requests." + topic;

    producer.on('ready', function (arg) {
      console.log('producer ready');

      const value = Buffer.from(fs.readFileSync("./cypress/fixtures/payloads/" + payload + ".json", "utf8"));
      const key = "";
      const partition = -1;
      const headers = [
        {
          "Container:Manifest:contents_type": "SkavaUs." + payload
        }
      ]

      //headers: [
      //  {
      //    'Container:Manifest:contents_type': <Buffer 53 6b 61 76 61 55 73 2e 4f 72 64 65 72 52 65 74 75 72 6e 65 64 50 72 6f 63 65 73 73 65 64>
      //  }
      //]

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

    producer.on('delivery-report', function (err, report) {
      console.log('deliver: ' + JSON.stringify(report.topic));
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