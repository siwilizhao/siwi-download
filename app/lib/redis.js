const {
    REDIS_PORT,
    REDIS_HOST
} = require('../config')

const options = {
    port: REDIS_PORT, // Redis port
    host: REDIS_HOST, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: '',
    db: 0
}
const Redis = require('siwi-ioredis')
const redisInstance = new Redis(options)
const redis = redisInstance.redisClient
module.exports = redis