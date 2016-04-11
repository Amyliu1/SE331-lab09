(function() {
'use strict';
// var languageServices = angular.module('languageServices',[]);

// languageServices.factory('UrlLanguageStorage',['$location',
//     function($location){
  angular.module('app').factory('UrlLanguageStoreage',UrlLanguageStoreage);
  /**@ngInject*/
  function UrlLanguageStoreage($location) {
    return {
      put: function () {},
      get: function () {
        return $location.search()['lang']
      }
    }
  }
})();
