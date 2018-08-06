var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var config = require('../config');

module.exports = {
	uploadFile: function (req, callback) {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var oldpath = files.pdfFileUpload.path;
			var newpath = path.join(config.fileUploadPath, files.pdfFileUpload.name);

			fs.rename(oldpath, newpath, function (errr) {
				callback(errr, newpath);
			});
		});
	}
}