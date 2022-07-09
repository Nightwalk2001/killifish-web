import {connect, PacketCallback} from "mqtt"

const PUB_TOPIC = "feeding-times"

export const mqttClient = connect(
    "ws://120.25.246.58:8083/mqtt", {username: "admin", password: "public"})

export const manuallyFeed = (
    id: string,
    count: number,
    cb?: PacketCallback
) => mqttClient.publish(PUB_TOPIC, JSON.stringify({id, count}), cb)
