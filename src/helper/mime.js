const path = require('path');

const mimeTypes = {
    'css': {
        text: 'text/css',
        image: 'css'
    },
    'gif': {
        text: 'image/gif',
        image: '/src/images/txt.svg'
    },
    'html': {
        text: 'text/html',
        image: 'html'
    },
    'ico': {
        text: 'image/x-icon',
        image: '/src/images/txt.svg'
    },
    'jpeg': {
        text: 'image/jpeg',
        image: '/src/images/txt.svg'
    },
    'jpg': {
        text: 'image/jpeg',
        image: '/src/images/txt.svg'
    },
    'js': {
        text: 'application/json',
        image: '/src/images/js.svg'
    },
    'json': {
        text: 'application/json',
        image: '/src/images/json.svg'
    },
    'pdf': {
        text: 'application/pdf',
        image: 'pdf'
    },
    'png': {
        text: 'image/png',
        image: '/src/images/txt.svg'
    },
    'svg': {
        text: 'image/svg+xml',
        image: '/src/images/image.svg'
    },
    'swf': {
        text: 'application/x-shockwave-flash',
        image: 'swf'
    },
    'tiff': {
        text: 'image/tiff',
        image: '/src/images/txt.svg'
    },
    'txt': {
        text: 'text/plain',
        image: '/src/images/txt.svg'
    },
    'wav': {
        text: 'audio/x-wav',
        image: 'wav'
    },
    'wma': {
        text: 'audio/x-ms-wma',
        image: 'wma'
    },
    'wmv': {
        text: 'video/x-ms-wmv',
        image: 'wmv'
    },
    'xml': {
        text: 'text/xml',
        image: 'xml'
    },
    '.eslintignore': {
        text: 'application/json',
        image: '/src/images/eslint.svg'
    },
    '.editorconfig': {
        text: 'application/json',
        image: '/src/images/configure.svg'
    },
    '.gitignore': {
        text: 'application/json',
        image: '/src/images/git.svg'
    },
    '.npmignore': {
        text: 'application/json',
        image: '/src/images/npm.svg'
    },
    'LICENSE': {
        text: 'application/json',
        image: '/src/images/license.svg'
    },
    'md': {
        text: 'application/json',
        image: '/src/images/md.svg'
    }
}

module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLocaleLowerCase();

    if(!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt'];

}

