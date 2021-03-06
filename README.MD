# siwi-download

![image](https://github.com/siwilizhao/siwi-download/blob/master/storage/design/diagram.svg)

## env.js

```js
const path = require('path')
module.exports = {
    REDIS_PORT: 6379,
    REDIS_HOST: '127.0.0.1',
    DOWNLOAD_PHOTO_PATH: path.resolve('./storage/movies'),
    DOWNLOAD_VIDEO_PATH: path.resolve('/storage/photos')
}
```

> example.env.js 重命名为 env.js 下载地址可根据实际情况修改

## 配置列表

```js
{
    SERVICE_NAME: 服务名称,
    WAIT_DURATION_60: 60等待,
    WAIT_DURATION_300: 300等待,
    WAIT_DURATION_600: 600等待,
    COMMON_WAIT_DURATION: 通用5等待,
    DOWNLOAD_VIDEO_LIST: 视频任务列表,
    DOWNLOAD_PHOTO_LIST: 图片任务列表,
    CURRENT_VIDEO_TASKING: 当前视频任务,
    CURRENT_PHOTO_TASKING: 当前图片任务,
    DOWNLOAD_PHOTO_PATH: 图片下载路径,
    DOWNLOAD_VIDEO_PATH: 视频下载路径,
    DOWNLOAD_SUCCESS_LIST: 成功下载队列,
    DOWNLOAD_FAIL_LIST: 失败下载队列,
    DOWNLOAD_PHOTO_WAIT_TIMES: 服务下载等待次数,
    DOWNLOAD_VIDEO_WAIT_TIMES: 服务下载等待次数,
    MONITOR_SET_VIDEO_WAIT_DURATION: 监控设置等待时长,
    MONITOR_SET_PHOTO_WAIT_DURATION: 监控设置等待时长,
    LOGGER_LIST: REDIS日志队列,
    SERVICE_ALIVE_REPORT: 存活上报,
    ALIVE_REPORT_DURATION: 存活上报间隔时间,
    REDIS_PORT: REDIS PORT,
    REDIS_HOST: REDIS HOST,
}
```

## 缓存结构

### DOWNLOAD_VIDEO_LIST

```js
{
    "title": "good",
    "url": ""
}
```

### CURRENT_VIDEO_TASKING

```js
{
    "title": "",
    "url": "",
    "start": ""
}
```

### DOWNLOAD_PHOTO_LIST

```json
{
    "title": "",
    "url": ""
}
```

### CURRENT_PHOTO_TASKING

```json
{
    "title": "",
    "url": "",
    "start": ""
}
```

### DOWNLOAD_SUCCESS_LIST

```json
{
    "title": "",
    "url": "",
    "start": "",
    "end": ""
}
```

### DOWNLOAD_FAIL_LIST

```json
{
    "title": "",
    "url": "",
    "start": "",
    "end": "",
    "error":""
    }
```

### LOGGER_LIST

```json
{
    "title": "",
    "msg": "",
    "date": "",
}
```

## 运行

```shell
pm2 start pm2.yml
```

或者

```shell
node index.js
```
