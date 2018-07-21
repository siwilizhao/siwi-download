const downloadM = require('../models/download')
const {
    DOWNLOAD_PHOTO_LIST
} = require('../config')
class Photo {
    constructor() {

    }
    async tasking(task) {
        const list = task['list']
        for (const pic of list) {
            await downloadM.getPhoto(pic)
        }

    }
}
module.exports = new Photo()