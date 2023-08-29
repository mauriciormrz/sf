/*
 * node-rdkafka - Node.js wrapper for RdKafka C/C++ library
 *
 * Copyright (c) 2016 Blizzard Entertainment
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

const Kafka = require('node-rdkafka');
const fs = require("fs");

var producer = new Kafka.Producer({
  'group.id': 'librd-test',
  'api.version.request': true,
  'bootstrap.servers': "pkc-lgk0v.us-west1.gcp.confluent.cloud:9092",
  'sasl.mechanism': "PLAIN",
  'sasl.password': "OoFuTeBJBoitrwl53HoKZtXal4Vnnku5Dsm0f7CVnl4cGZJrp87d+7Zz0dF8eC8o",
  'sasl.username': "SMJXDBRARWATY3E7",
  'security.protocol': "SASL_SSL",
  'ssl.ca.location': "./cypress/fixtures/kafkacert.pem",
  'dr_cb': true
});

var topicName = 'clone.orders.public.requests.orders';

////logging debug messages, if debug is enabled
//producer.on('event.log', function (log) {
//  console.log(log);
//});

////logging all errors
//producer.on('event.error', function (err) {
//  console.error('Error from producer');
//  console.error(err);
//});


producer.on('delivery-report', function (err, report) {
  console.log('deliver: ' + JSON.stringify(report.topic));
});

//Wait for the ready event before producing
producer.on('ready', function (arg) {
  console.log('producer ready');

  const value = Buffer.from(fs.readFileSync('./cypress/fixtures/payloads/OrderPlaced.json', "utf8"));
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

//starting the producer
producer.connect();