const config = require('./');

module.exports = {
    src: [
        config.srcDir + '/fonts/**/*.*',
        config.srcDir + '/images/**/*.*',
    ],
    dest: config.destDir,
    options: {
        prefix: 1
    }
};