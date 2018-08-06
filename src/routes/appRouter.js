var router = require('express').Router();
var fileCtrl = require('../controller/FileCtrl');
var PDFParserLib = require('../lib/PDFParserLib');
var userCtrl = require('../controller/userCtrl');

router.post('/fileupload', function (req, res) {
	fileCtrl.saveFile(req, function (err, user) {
		var errMsg = "";

		if(err) {
			errMsg = err;
		}

		res.render("components/userProfile", {
			users: [user],
			errMsg: errMsg
		});
	});
});

router.get('/parse', function (req, res) {
	PDFParserLib.parse('/var/tmp/fileUpload/WordDocument.pdf', function (err, data) {
		res.send({"data": data});
	});
});

module.exports = router;