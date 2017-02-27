var debug = true;
var versionNumber = "1.0";
var version = "weApp/" + versionNumber;

var requestUrl = 'https://yixing02.applinzi.com/api/';
var imagesUrl = 'http://yixing02-images.stor.sinaapp.com/';
var uploadUrl = 'https://yixing02.applinzi.com/api/upload/uploadImage.php';
var uploadDir = 'weApp/upload/'

module.exports.debug = debug;
module.exports.versionNumber = versionNumber;
module.exports.version = version;

module.exports.requestUrl = requestUrl;
module.exports.imagesUrl = imagesUrl;
module.exports.uploadUrl = uploadUrl;
module.exports.uploadDir = uploadDir;