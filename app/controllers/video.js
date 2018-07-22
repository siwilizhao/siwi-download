const request = require('../lib/request')
const {
    DOWNLOAD_VIDEO_LIST
} = require('../config')
class Photo {
    constructor() {

    }
    async tasking(task) {
        const title = task['title']
        const url = task['url']
        const filename = `${task['title']}.mp4`
        const filefullpath = `${save_path}/${filename}.jpg`
        const result = await request.getFile(url, filefullpath)
        return result
    }
}
module.exports = new Photo()