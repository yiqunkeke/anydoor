// http 模块是 NodeJS中的内置模块
const http = require('http');
const chalk = require('chalk');
const path = require('path');
// const fs = require('fs');
// const promisify = require('util').promisify;
// const stat = promisify(fs.stat);
// const readdir = promisify(fs.readdir);
const conf = require('./config/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((req, res) => {
    /**
     * req 和 res 分别对应请求与响应
     * 也就是 NodeJS 把客户端发来的请求放到了 req 对象中,
     *  所以我们想读一些客户端请求相关的信息，就从 req 中拿
     *  把服务器要返回的响应封装到了 res 对象中,
     *  服务器需要生成的内容和相关设置，就需要到 res 中。
     */

    const url = req.url;
    const filePath = path.join( conf.root, url) ;
    // res.end(filePath);

   // 4. 使用 async 与 await ,并模块化
   route(req, res, filePath);

   // 3. 使用promisify ---分离式回调
   /**
    stat(filePath)
    .then(stats => {
        // 如果是文件，则读取文件并返回
        if(stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if(stats.isDirectory()) {
            // 如果是文件夹，则返回文件列表
            readdir(filePath)
            .then(files => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(files.join(','));
            })
        }
    })
    .catch(err => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
    })
    */

    // 2. 使用回调方式 error-first 风格
    /*
    fs.stat(filePath, (err, stats) => {
        // 出错
        if(err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`${filePath} is not a directory or file`);
            return;
        }

        // 如果是文件，则读取文件并返回
        if(stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // 两种方式读取文件并发送。
            // 1. 第一种通过readFile----这种方式的响应速度非常慢
            // fs.readFile(filePath, (err, data) => {
            //     res.end(data);
            // })

            // 2. 第二种，通过stream流。---两个必要条件：数据和方向
            // 把filePath对应的文件读出来，通过流的形式，一点点吐回给客户端
            // pipe(res) 用于指定流的方向
            // 可以查看 demos/41_readstream.js
            fs.createReadStream(filePath).pipe(res);
        } else if(stats.isDirectory()) {
            // 如果是文件夹，则返回文件列表
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(files.join(','));
            })
        }
    })
    */

    // 1. 简单的例子
    /**
    res.statusCode = 200; // 设置响应的状态码
    res.setHeader('Content-Type', 'text/html'); // 设置HTTP协议中响应头Content-Type
    res.write("<html>"); // 给响应中写返回内容
    res.write("<body>"); // 由于 req 和 res 都是流对象，都是可写的流，所以它们都有 res.write 和 res.end
    res.write("Hello HTTP!");
    res.write("</body>");
    res.end("</html>"); // 最后一步一定要调用一下 res.end(); 发送
    */
})

// 接下来监听主机和端口号，等着客户端来请求
server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);
    console.log(111, process.cwd());
})



/**
 *  1. 服务器端的程序改动之后，需要重启下服务。
 *
 *  2. 响应内容格式
 *  res.setHeader('Content-Type', 'text/plain'); // 文本文件格式
 *  res.setHeader('Content-Type', 'text/html');  // html文件格式
 *
 *  3. supervisor 第三方模块来自动监视文件变化，无需每次手动重启服务。
 *  npm i supervisor -g
 *  然后使用 supervisor app.js 来启动服务。运行结果如下：
 *
 *  Running node-supervisor with
    program 'app.js'
    --watch '.'            // --watch '.'表示监视当前文件目录
    --extensions 'node,js'  // --extensions 表示监视哪些文件的变化
    --exec 'node'

    Starting child process with 'node app.js'
    Watching directory 'D:\github\anydoor\src' for changes.
    Press rs for restarting the process.
    Server started at http://127.0.0.1:9527

 *  作用：帮我们监视文件的变化，当文件发生变化时会自动重启
 */

 /**
  * 实现功能：静态资源服务器
  * 1. 根据用户请求的url来判断，如果访问的是一个文件夹（目录），就把该目录下的文件列表展示出来
  * 2. 如果访问的是一个文件，就把文件内容读取返回
  *
  * 3. 怎么拿到用户请求的路径呢？
  * 用户请求相关的东西被封装在 req 中。
  *
  * 4. 把用户当前执行的文件夹当成根目录。
  *    用户的根目录就是当前的文件夹
  *
  * 5. 怎么拿到用户当前执行的文件夹呢？
  *     需要用到前面讲的 process.cwd()
  *     所以可以在 defaultConfig.js中 配置
  *     process.cwd() 会随着用户路径的变化而变化。
  *
  * 6. 使用 promisify内置模块，来把回调函数 promise化
  *
  * 7. 使用async 和 await 并模块化代码
  */

  /** 总结下：
   *  fs 模块
   *  util模块中的 promisify
   *  fs.stat 获取文件的相关信息：利用了其中两个重要的方法
   *  stats.isFile() ---判断是否是文件
   *  stats.isDirectory ----判断是否是目录
   *  fs.createReadStream()---创建流对象
   *  并使用 rs.pipe()方法---指定流的方向
   *
   */

   /** 接着完善功能：
    *  实现当url是一个目录时，返回文件列表，并让列表项可以点击
    *  不需要在浏览器 url 地址栏中手动输入 url
    *
    *  实现方法：
    *  在访问的url是一个目录文件时，返回一个html，这个html中文件列表是链接，点击可以直接跳转。
    *
    *  做法1：可以直接在 res 中拼接 html
    *  优点：效率高 缺点：不好维护
    *
    *  做法2： 使用 handlebars 模板引擎
    *  优点：便于维护，可读性好。 效率没有直接拼接html字符串高。
    *   推荐使用第二种做法
    *
    */

    /**
     *  handlebars
     *  http://handlebarsjs.com/
     *
     *  安装：
     *  npm install handlebars
     */


     /** 功能：
      * 如果访问的是文件，
      * 根据不同的文件格式，返回不同的 Content-Type
      *     Content-Type
      *     MIME
      *
      * 如果访问的是目录，则目录名前面加图标
      *
      */
