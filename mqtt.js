import mqtt from 'mqtt'
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org')
const topic = "doan2-hust"


mqttClient.on('connect', () => {
	console.log("Connecting to broker")
	mqttClient.subscribe(topic, (err) => {
		if(err) {
			throw Error("Cannot subscribe the topic " + topic)
		} else {
			console.log("Subscribed to topic " + topic)
		}
	})
})

mqttClient.on('message', (topic, message) => {
	console.log("Receving messages from topic " + topic + message)
	// Todo: Handle logic here
})

export default mqttClient
