var userManager = require('../managers/userManager');
var UserSchema = require('../schemas/user');

module.exports = {
	saveUser: function (userDetails) {
		return new Promise(function (resolve, reject) {
			userManager.upsertUser(userDetails, function (err, doc) {
				if(err) {
					reject(err);
				} else {
					resolve(doc);
				}
			});
		});
	},

	getUserDetails: function (userDetails) {
		return new Promise(function (resolve, reject) {
			userManager.getUserDetails(userDetails, function (err, docs) {
				if(err) {
					reject(err);
				} else {
					resolve(docs[0]);
				}
			});
		});
	}
}