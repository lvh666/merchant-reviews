'use strict';

const Service = require('egg').Service;
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');
const fs = require('fs');

class ToolsService extends Service {
  /**
   * 获取文件上传目录
   * @param {*} filename
   */
  async getUploadFile(filename, fileDir) {
    // 上传基础目录
    const uplaodBasePath = 'app/public/upload/';
    // 1.获取当前日期
    const day = sd.format(new Date(), 'YYYYMMDD');
    // 2.创建图片保存的路径
    const dir = path.join(uplaodBasePath, day);
    // 判断文件夹是否存在，不存在则直接创建文件夹
    await mkdirp(dir);
    const date = Date.now(); // 毫秒数
    // 生成写入路径
    const target = path.join(dir, date + path.extname(filename));
    const readStream = fs.createReadStream(fileDir);
    const writeStream = fs.createWriteStream(target);
    readStream.pipe(writeStream);

    return writeStream;
  }
}

module.exports = ToolsService;
