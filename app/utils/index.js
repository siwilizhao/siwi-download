let instance = null
const dateHelper = require('siwi-datehelper')
class Utils {
    constructor () {
        if (!instance) {
            instance = this
        }
        return instance
    }

    async time() {
        return Math.floor(Date.now()/1000)
    }
}

module.exports = new Utils()