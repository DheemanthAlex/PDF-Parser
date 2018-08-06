var MailLib = require('../lib/MailLib');

module.exports = {
	sendMail: function (fromMailID, toMailID, content, attachments) {
		if(fromMailID && toMailID && content) {
			MailLib.sendMail(fromMailID, toMailID, content, attachments);
		}
	}
}