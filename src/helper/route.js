const fs = require('fs');
const path = require('path'); // 注意，在处理路径相关时，尽量都使用绝对路径
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const mime = require('./mime');

const tplPath = path.join(__dirname, '../template/dir.tpl'); // 拼接模板文件路径
const source = fs.readFileSync(tplPath); // 读取模板源码---默认buffer格式
const template = Handlebars.compile(source.toString()); // 使用 handlebasr带的 compile方法编译模板源码,获取模板
// handlebasr 编译需要的是 source字符串格式
// 所以这里用 toString()转换。这种方式读取效率高，因为默认buffer格式的读取，比utf-8要快

// 或者用下面的方式转为字符串
// 把读取结果--使用 utf-8强制转换为字符串格式
// const source = fs.readFileSync(tplPath, 'utf-8');
// const template = Handlebars.compile(source);

module.exports = async function(req, res, filePath) {
    try {
        const stats = await stat(filePath);
        // 如果是文件，则读取文件并返回
        if(stats.isFile()) {
            const contentType = mime(filePath);
            res.statusCode = 200;
            // 如果是文件的话，使用 mimeType识别，返回不同类型的格式
            res.setHeader('Content-Type', contentType.text);
            fs.createReadStream(filePath).pipe(res);

        } else if(stats.isDirectory()) {
            // 如果是文件夹，则返回文件列表
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            // 定义返回的数据
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}`: '',
                files: files.map( file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            }
            res.end(template(data));
            // res.end(files.join(','));

        }
    } catch(ex) {
        console.log(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
    }
}
