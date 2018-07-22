const path = require('path')
module.exports = {
    REDIS_PORT: 6379,
    REDIS_HOST: '127.0.0.1',
    DOWNLOAD_PHOTO_PATH: path.resolve('./storage/movies'),
    DOWNLOAD_VIDEO_PATH: path.resolve('/storage/photos')
}