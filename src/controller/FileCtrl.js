var fileLib = require('../lib/FileLib');
var PDFParserLib = require('../lib/PDFParserLib');
var MailCtrl = require('./MailCtrl');
var UsrCtrl = require('./userCtrl');
var config = require('../config');

module.exports = {
	saveFile: function (req, callback) {
		var fileName;
		fileLib.uploadFile(req, function (err, fileUploadPath) {
			fileName = getFileName(fileUploadPath);
			PDFParserLib.parse(fileUploadPath, async function (errr, user) {
				if(!errr && !user.isEmpty) {
					user.user_cerificates = [];
					user.user_cerificates.push({
						"file_name": fileName,
						"file_upload_path": fileUploadPath
					});

					await UsrCtrl.saveUser(user);

					var userDoc = await UsrCtrl.getUserDetails(user);
					var attachments = [];
					attachments.push({
						"filename": fileName,
						"path": fileUploadPath
					});

					var content = {
						subject: fileName + " PDF Uploaded to server.",
						text: "Hi "+ user.user_name + "\n\n" + fileName + " PDF Uploaded to server."
					};

					MailCtrl.sendMail(config.from_mail_id, user.user_emailid, content, attachments);
				}
				callback(errr, userDoc);
			});
		});
	}
};

function getFileName(fileUploadPath) {
	var a = fileUploadPath.split('/');
	return a[a.length - 1];
}