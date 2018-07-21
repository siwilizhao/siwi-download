const wait = require('siwi-wait')
const redis = require('./app/lib/redis')
const photo = require('./app/controllers/photo')
const video = require('./app/controllers/video')
const utils = require('./app/utils')
const siwiLogger = require('siwi-logger')
const logger = require('./app/models/logger')
const {
    DOWNLOAD_PHOTO_LIST,
    DOWNLOAD_VIDEO_LIST,
    COMMON_WAIT_DURATION,
    DOWNLOAD_SUCCESS_LIST,
    DOWNLOAD_FAIL_LIST,
    MONITOR_SET_PHOTO_WAIT_DURATION,
    MONITOR_SET_VIDEO_WAIT_DURATION,
    ALIVE_REPORT_DURATION,
    SERVICE_ALIVE_REPORT
} = require('./app/config')
class Service {
    constructor() {
        this.init()
        this.photo()
        this.video()
    }

    /**
     * init
     */
    async init() {
        const options = {
            path: `${process.env.PWD}/storage/logs`,
            expire: 86400 * 7,
            name: 'siwi-logger'
        }
        await siwiLogger.init(options)
    }

    /**
     * 下载图片
     */
    async photo() {
        while (true) {
            const duration = await redis.get(MONITOR_SET_PHOTO_WAIT_DURATION)

            if (duration) {
                await wait(duration * 1000)
            }

            const json = await redis.rpop(DOWNLOAD_PHOTO_LIST)
            if (json) {
                const task = JSON.parse(json)
                task['start'] = await utils.time()
                const res = await photo.tasking(task)
                task['end'] = await utils.time()
                if (res) {
                    await redis.lpush(DOWNLOAD_SUCCESS_LIST, JSON.stringify(task))
                } else {
                    await redis.lpush(DOWNLOAD_FAIL_LIST, JSON.stringify(task))
                }
            } else {}
        }
    }
    /**
     * 下载电影
     */
    async video() {
        while (true) {
            const duration = await redis.get(MONITOR_SET_VIDEO_WAIT_DURATION)

            if (duration) {
                await wait(duration * 1000)
            }
            const json = await redis.rpop(DOWNLOAD_VIDEO_LIST)
            if (json) {
                const task = JSON.parse(json)
                task['start'] = await utils.time()
                const res = await video.tasking(task)
                task['end'] = await utils.time()
                if (res) {
                    await redis.lpush(DOWNLOAD_SUCCESS_LIST, JSON.stringify(task))
                } else {
                    await redis.lpush(DOWNLOAD_FAIL_LIST, JSON.stringify(task))
                }

            } else {
                await logger.msg(`no video task`)
                await wait(COMMON_WAIT_DURATION * 1000)
            }
        }
    }

    /**
     * 服务存活上报
     */
    async report() {
        while (true) {
            const seconds = ALIVE_REPORT_DURATION + 20
            await redis.setex(SERVICE_ALIVE_REPORT, seconds, 1)
            await wait(ALIVE_REPORT_DURATION * 1000)
        }
    }
}

module.exports = new Service()