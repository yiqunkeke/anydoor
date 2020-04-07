 const { cache } = require('../config/defaultConfig');

// 1. 根据配置更新响应
 function refreshRes(stats, res) {
    const {maxAge, expires, cahceControl, lastModified, etag} = cache;

    // 设置 expires
    if(expires) {
        res.setHeader('Expires', (Date.now() + maxAge*1000).toString());
    }

    // 设置cacheControl
    if(cahceControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }

    // lastModified
    if(lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toString());
    }

    // etag
    if(etag) {
        // 也可以使用生成 etag的包
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`);
    }

 }

 // 2. 导出
 module.exports = function isFresh(stats, req, res) {
     refreshRes(stats, res);

     const lastModified = req.headers['if-modified-since'];
     const etag = req.headers['if-none-match'];

     // 客户端请求中没有 lastModified 和 etag
     // 代表：第一次请求
     if(!lastModified && !etag) {
         return false;
     }

     // 请求中的lastModified与响应中的不一样
     // 代表：缓存失效
     if(lastModified && lastModified !== res.getHeader('Last-Modified')){
         return false;
     }

     // 请求中的etag与响应中的不一样
     // 代表：缓存失效
     if(etag && etag !== res.getHeader('ETag')){
        return false;
     }

    // 否则，可以使用缓存
    return true;
 }
