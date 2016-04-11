(function() {
  'use strict';

  angular
    .module('labApp', [
      'ngRoute',
      'productMainController',
      'languageControllers',
      'languageServices',
      'pascalprecht.translate',
      'shoppingCartControllers',
      'flow'
    ]);

})();
