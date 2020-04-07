const {createGzip, createDeflate} = require('zlib');
// nodeJS内置的 zlib模块，进行压缩

module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding']; // req中，已经把 Accept-Encoding自动转换为了小写
    if(!acceptEncoding || !acceptEncoding.match(/\bgzip|deflate\b/)) {
        return rs;
    } else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding', 'gzip')
        return rs.pipe(createGzip());
    } else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding', 'deflate')
        return rs.pipe(createDeflate());
    }
}
