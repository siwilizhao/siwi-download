const request = require('../lib/request')
const unique = require('siwi-uniquestring')
const path = require('path')
const fs = require('fs')
const {
    DOWNLOAD_PHOTO_LIST,
    DOWNLOAD_PHOTO_PATH
} = require('../config')
class Photo {
    constructor() {
        
    }

    async tasking(task) {
        const list = task['list']
        const save_path = `${DOWNLOAD_PHOTO_PATH}/${task['title']}`
        if (!fs.existsSync(save_path)) {
            fs.mkdirSync(save_path)
        }
        const result = {
            success: [],
            fail:[]
        }
        for (const pic of list) {
            const filename = await unique.random(32)
            const filefullpath = `${save_path}/${filename}.jpg`
            const res = await request.getPhoto(pic, filefullpath)
            res ? result.success.push():result.fail.push(pic)
        }
        return result
    }
}
module.exports = new Photo()