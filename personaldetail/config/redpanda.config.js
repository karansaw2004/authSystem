import {Kafka} from "kafkajs";

class RedpandaClient {
    #redpandaClient;
    #redpandaProducer;
    #redpandaConsumer;
    constructor(){
        this.#redpandaClient = null;
        this.#redpandaProducer = null;
    }
    setConfig({clientId,brokers}){
        this.#redpandaClient = new Kafka({
            clientId: clientId,
            brokers: brokers
        });
    }
    createProducer(){
        this.#redpandaProducer = this.#redpandaClient.producer();
    }
    createConsumer(groupId){
        this.#redpandaConsumer = this.#redpandaClient.consumer({ groupId: groupId });
    }
    async connectProducer(){
        await this.#redpandaProducer.connect();
    }
    async connectConsumer(){
        await this.#redpandaConsumer.connect();
    }
    async disconnectProducer(){
        if (this.#redpandaProducer) {
            await this.#redpandaProducer.disconnect();
        }
    }
    async disconnectConsumer(){
        if (this.#redpandaConsumer) {
            await this.#redpandaConsumer.disconnect();
        }
    }
    getProducer(){
        return this.#redpandaProducer;
    }
    getConsumer(){
        return this.#redpandaConsumer;
    }
    async produceMessage(topic, message) {
        return await this.#redpandaProducer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(message) }
            ]
        });
    }
    async consumeMessages(topic, fromBeginning, eachMessage) {
        await this.#redpandaConsumer.subscribe({ topic: topic, fromBeginning: fromBeginning });
        await this.#redpandaConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = JSON.parse(message.value.toString());
                await eachMessage({ topic, partition, message: value });
            },
        });
    }
};

export {RedpandaClient};