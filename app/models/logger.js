const {
    SERVICE_NAME,
    LOGGER_LIST
} = require('../config')
const utils = require('../utils')
const redis = require('../lib/redis')
const instance = null
const SiwiLogger = require('siwi-logger')
class Logger {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }
    async msg(msg) {
        console.log(msg)
        const data = {
            title: SERVICE_NAME,
            msg: msg,
        }
        await redis.lpush(LOGGER_LIST, JSON.stringify(data))
    }
}

module.exports = new Logger()