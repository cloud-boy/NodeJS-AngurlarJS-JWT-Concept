'use strict';

/**
 * @ngdoc directive
 * @name jwtTraiApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('jwtTraiApp')
  .directive('validateEqual', function () {
    return {
      require : 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
      	
      	function validateEqual (value) {
      		var valid = (value === scope.$eval(attrs.validateEqual));
      		ngModelCtrl.$setValidity('equal', valid);
      		return valid ? value : undefined;
      	}
      	ngModelCtrl.$parsers.push(validateEqual);
      	ngModelCtrl.$formatters.push(validateEqual);
		console.log(ngModelCtrl.$viewValue);
		scope.$watch(attrs.validateEqual, function () {
			//console.log(ngModelCtrl.$viewValue);
			ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);

		});

		/*ngModelCtrl.$validators.validateEqual = function(value){
			var valid = (value === scope.$eval(attrs.validateEqual));
				return valid ? value : undefined;
		};

		scope.$watch(attrs.validateEqual, function () {
			ngModelCtrl.$validate();
			//ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
		}); */   
      }
    };

  });
