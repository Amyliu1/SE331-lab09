(function() {
'use strict';
  
 angular.module('app')
   .controller('LanguageController',languageController);

  /**@ngInject*/
   function languageController($translate,$location,$locale) {
      var currentLocal = $locale.id.substring(0, 2);
var vm = this;
      vm.currentLocale = currentLocal;
      vm.changeLanguage = function (locale) {
        $translate.use(locale);
        $location.search('lang', locale);
        vm.currentLocale = locale;
      }
    
    }
})();
