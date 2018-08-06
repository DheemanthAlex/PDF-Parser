angular
.module("pdfParser", [])
.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {
	$scope.appTitle = "PDF Parser";

	$scope.formSubmit = function ($event) {
		var filePath = $('#pdfFileUpload').val();

		if(filePath && isPDFfile(filePath)) {
			$('#pdfUploadForm').submit();
		} else {
			alert("Please upload a PDF file");
		}

		$event.preventDefault();
	}

	function isPDFfile(filePath) {
		var elems = filePath.split('.');
		if(elems[elems.length - 1].toLowerCase() == 'pdf') {
			return true;
		} else {
			return false;
		}
	}
}])