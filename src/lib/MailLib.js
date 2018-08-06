var nodemailer = require('nodemailer');
var config = require('../config');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.transporter_email_ID,
		pass: config.transporter_email_pwd
	}
});

module.exports = {
	sendMail: function (fromMailID, toMailID, content, attachments) {
		var mailOptions = {
			from: fromMailID,
			to: toMailID,
			subject: content.subject,
			text: content.text
		};

		if(attachments.length > 0) {
			mailOptions.attachments = attachments
		}

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
}