const http = require("http");
const https = require("https");
const fs = require("fs");
const {
    promisify
} = require("util");
const writeFile = promisify(fs.writeFile);
const {
    URL
} = require("url");
const Promise = require('bluebird')
class Request {
    constructor() {}
    /**
     * 下载文件
     * @param {*} url
     * @param {*} filefullpath
     */
    async getFile(url, filefullpath) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const {
                protocol,
                search,
                pathname
            } = urlObj;
            const options = {
                hostname: urlObj["hostname"],
                port: urlObj["port"],
                path: `${pathname}${search}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            const R = protocol == "http:" ? http : https;
            const req = R.request(options, res => {
                const {
                    statusCode
                } = res;
                if (statusCode !== 200) {
                    const err = new Error(`请求失败， 状态码：${statusCode}`);
                    res.resume();
                    return reject(err);
                }
                res.setEncoding("binary");
                req.setTimeout(1000 * 3600 * 1);
                const defaults = {
                    flags: "w",
                    encoding: "binary",
                    fd: null,
                    mode: 0o666,
                    autoClose: true
                };
                const stream = fs.createWriteStream(filefullpath, defaults);
                let length = 0
                res.on("data", chunk => {
                    length += Buffer.byteLength(chunk)
                    console.log(Math.floor(length * 100 / 1048576) / 100 + 'mb')
                    stream.write(chunk);
                });
                res.on('error', error => {
                    console.log(error)
                    return reject(false)
                })
                res.on("end", function () {
                    resolve({
                        res: 0,
                        msg: "OK"
                    });
                });
            });
            req.on("error", error => {
                console.log(error);
                return reject(false);
            });
            req.setTimeout(1000 * 3600 * 2, error => {
                req.abort();
                console.log(error);
                return reject(false);
            });
            req.end();
        }).catch(error => {
            console.log('catch error:' + error)
            return error
        })
    }
}

module.exports = new Request()