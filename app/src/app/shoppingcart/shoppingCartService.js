(function() {
'use strict'
  angular.module('app').factory('shoppingCartService',shoppingCartService);
// var shoppingCartServices = angular.module('shoppingCartServices',['ngResource']);
// shoppingCartServices.factory('shoppingCartService',function($resource){
  function shoppingCartService($resource) {


    return $resource('http://localhost:8080/shoppingcart/:id', {id: '@_id'}, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  }
})();
