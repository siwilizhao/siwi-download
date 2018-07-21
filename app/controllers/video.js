const downloadM = require('../models/download')
const {
    DOWNLOAD_VIDEO_LIST
} = require('../config')
class Photo {
    constructor() {

    }
    async tasking(task) {
        const title = task['title']
        const url = task['url']
        await downloadM.getVideo()
    }
}
module.exports = new Photo()