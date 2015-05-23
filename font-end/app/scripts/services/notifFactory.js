'use strict';

/**
 * @ngdoc service
 * @name jwtTraiApp.Notifier
 * @description
 * # Notifier
 * Factory in the jwtTraiApp.
 */

angular.module('jwtTraiApp').value('toastr', toastr);

angular.module('jwtTraiApp')
  .factory('notifFactory', ['toastr', function (toastr) {

    return {
      onSuccess: function (msgTitle, msgBody) {
        toastr.success(msgBody, msgTitle);
        console.log(msgBody, msgTitle);
      },
      onError: function (msgTitle, msgBody) {
        toastr.error(msgBody, msgTitle);
        console.log(msgBody, msgTitle);
      }
    };
  }]);
