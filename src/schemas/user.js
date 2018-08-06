var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	"user_name": {
		type: String,
		//required: true
	},
	"user_emailid": {
		type: String,
		required: true,
		index: true
	},
	"user_dob": String, // Should be Date, but couldn't parse date well
	"user_phone_number": String, // Not Number because the phoneNumber sometimes contain '-' character
	"user_cerificates": [{
		"file_name": String,
		"file_upload_path": String
	}]
},
{
	collection: 'users'
});

module.exports = mongoose.model('users', userSchema);