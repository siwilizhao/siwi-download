const request = require('../lib/request')
const {
    DOWNLOAD_PHOTO_PATH,
    DOWNLOAD_VIDEO_PATH
} = require('../config')
class Download {
    constructor() {

    }
    async getPhoto(uri) {
        await request.getFile(uri)
    }
    async getVideo(uri) {
        await request.getFile(uri)
    }
}

module.exports = new Download()