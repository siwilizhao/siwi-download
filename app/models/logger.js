const {
    SERVICE_NAME,
    LOGGER_LIST
} = require('../config')
const utils = require('../utils')
const redis = require('../lib/redis')

let instance = null
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
            date: await utils.time()
        }
        await redis.lpush(LOGGER_LIST, JSON.stringify(data))
    }
}

module.exports = new Logger()