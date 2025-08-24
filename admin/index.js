import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:19092"]
});

const admin = kafka.admin();

;(async () => {
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: "otp",
        numPartitions: 1 // You can change this number as needed
      }
    ]
  });
  console.log("Partition for topic 'otp' created");
  await admin.disconnect();
})();
