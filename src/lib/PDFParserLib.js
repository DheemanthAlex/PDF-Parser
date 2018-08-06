var pdfParser = require('pdf-parser');

module.exports = {
	parse: function (path, callback) {
		pdfParser.pdf2json(path, function (error, pdfData) {
			var user;
			if(!error) {
				user = parseJSON(pdfData);
			}
			callback(error, user);
		});
	}
}

function parseJSON(pdfData) {
	try {
		var pages = pdfData.pages;
		var user = {
			user_name: '',
			user_emailid: '',
			user_phone_number: '',
			user_dob: '',
			isEmpty: true
		};
		for(var p = 0; p < pages.length; p++) {
			var page = pages[p];
			var texts = page.texts;
			for(c = 0; c < texts.length; c++) {
				var text = texts[c].text;
				if(text && text.trim().length > 0) {
					var dataArray = text.split(':');
					if(dataArray.length > 1) {
						var value = dataArray[1].trim();
						user.isEmpty = false;
						if(isMailID(value)) {
							user.user_emailid = value;
						} else if(isName(value)) {
							user.user_name = value;
						} else if(isPhoneNumber(value)) {
							user.user_phone_number = value;
						} else {
							user.user_dob = value;
						}
					}
				}
			}
		}
		return user;
	} catch (e) {
		console.log("ERROR while extracting data from JSON from PDF " + e);
		return {
			isEmpty: true
		}
	}
}

function isMailID(inputStr) {
	var patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return patt.test(inputStr);
}

function isName(inputStr) {
	var patt = /^[a-zA-Z]+ *[a-zA-Z]*$/;
	return patt.test(inputStr);
}

function isPhoneNumber(inputStr) {
	var patt = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	return patt.test(inputStr);
}