(function() {
  'use strict';

  angular
    .module('app')
    .config(configTranslation)
    .config(configCompilerProvider)
    .config(configFlowFactoryProvider);

  /** @ngInject */
  // function config($logProvider, toastrConfig) {
  //   // Enable log
  //   $logProvider.debugEnabled(true);
  //
  //   // Set options third-party lib
  //   toastrConfig.allowHtml = true;
  //   toastrConfig.timeOut = 3000;
  //   toastrConfig.positionClass = 'toast-top-right';
  //   toastrConfig.preventDuplicates = true;
  //   toastrConfig.progressBar = true;
  // }
  function configTranslation($translateProvider){
    $translateProvider.useUrlLoader('http://localhost:8080/messageBundle');
    $translateProvider.useStorage('UrlLanguageStorage');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }
  
  function configFlowFactoryProvider(flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: false
    };
  }
  
  function configCompilerProvider($compilerProvider) {
    $compilerProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
    $compilerProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
  }

})();
