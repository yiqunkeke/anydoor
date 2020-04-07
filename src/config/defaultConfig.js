/**
 * 定义了一个 hostname 和 port，分别对应主机名和端口号。
 * 也就说指定客户端用哪个主机和哪个端口号来访问 server。
 * 我们在本地开发时，通常就使用 `localhost` 或者 `127.0.0.1`来访问。
 * 由于 http 默认的端口号是 `80`端口，使用 `80` 端口需要一些管理员权限，
 * 所以通常我们会用一个自定义的端口号。为了防止跟系统默认的端口号冲突，
 * 这个自定义端口号会起的大一点，比如这里我们使用的是 `3000` 端口。
 */
module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 9527,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}
