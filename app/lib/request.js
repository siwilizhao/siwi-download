const http = require("http");
const https = require("https");
const fs = require("fs");
const {
    URL
} = require("url");
const Promise = require('bluebird')
class Request {
    constructor() {}
    async getPhoto(url, filefullpath) {
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
                    console.log(err)
                    return reject(false);
                }
                res.setEncoding("binary");
                req.setTimeout(1000 * 60 * 5);
                const defaults = {
                    flags: "w",
                    encoding: "binary",
                    fd: null,
                    mode: 0o666,
                    autoClose: true
                };
                const stream = fs.createWriteStream(filefullpath, defaults);
                res.on("data", chunk => {
                    stream.write(chunk);
                });
                res.on('error', error => {
                    console.log(error)
                    return reject(false)
                })
                res.on("end", function () {
                    resolve(true);
                });
            });
            req.on("error", error => {
                console.log(error);
                return reject(false);
            });
            req.setTimeout(1000 * 60 * 5, error => {
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
                res.on("data", chunk => {
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