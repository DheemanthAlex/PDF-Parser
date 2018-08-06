var UserSchema = require('../schemas/user');

module.exports = {
	upsertUser: function (userDetails, callback) {
		var filter = {
			user_emailid: userDetails.user_emailid
		};

		var update = {
			$set: {
				user_name: userDetails.user_name,
				user_emailid: userDetails.user_emailid,
				user_phone_number: userDetails.user_phone_number,
				user_dob: userDetails.user_dob
			},
			$push: {
				user_cerificates:{
					$each: userDetails.user_cerificates
				}
			}
		};

		UserSchema.findOneAndUpdate(filter, update, {upsert:true}, function(err, doc){
		    callback(err, doc);
		});
	},

	getUserDetails: function(userDetails, callback) {
		UserSchema
		.find({
			"user_emailid": userDetails.user_emailid
		}).exec(function (err, docs) {
			callback(err, docs);
		});
	}
}