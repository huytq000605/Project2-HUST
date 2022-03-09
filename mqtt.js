import mqtt from 'mqtt'
import { knex } from './index.js'
export const mqttClient = mqtt.connect('mqtt://test.mosquitto.org')
export const receiveTopic = "doan2-hust/device";
export const sendTopic = "doan2-hust/web";

mqttClient.on('connect', () => {
	console.log("Connecting to broker")
	mqttClient.subscribe(receiveTopic, (err) => {
		if(err) {
			throw Error("Cannot subscribe the topic " + receiveTopic)
		} else {
			console.log("Subscribed to topic " + receiveTopic)
		}
	});
	mqttClient.subscribe(sendTopic, (err) => {
		if(err) {
			throw Error("Cannot subscribe the topic " + sendTopic)
		} else {
			console.log("Subscribed to topic " + sendTopic)
		}
	})
})

mqttClient.on('message', (topic, message) => {
	console.log("Receving messages from topic " + topic + message);
	message = message.toString()
	// Todo: Handle logic here
	if (topic === receiveTopic) {
		const receivedData = message.split("_");
		const lux = Number(receivedData[0])
		const mode = Number(receivedData[1])
		knex('light').insert({value: lux})
		.then(()=>{
			console.log("Inserted to light table: ", light);
		})
		
		knex('mode').insert({value: mode})
		.then(()=>{
			console.log("Inserted to mode table: ", mode);
		})
	}
})

//export default mqttClient
