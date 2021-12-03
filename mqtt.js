const mqttClient = mqtt.connect('mqtt://test.mosquitto.org')
const topic = "doan2-hust"

mqttClient.on('connect', () => {
	mqttClient.subscribe(topic, (err) => {
		if(err) {
			throw Error("Cannot subscribe the topic " + topic)
		}
	})
})

mqttClient.on('message', (topic, message) => {
	console.log("Receving messages from topic " + topic)
	// Todo: Handle logic here
})

export default mqttClient