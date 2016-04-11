(function() {
  'use strict'
  angular.module('app')
    .factory('productService', productService)
    .factory('totalCalService', totalCalService)
    .factory('queryProductService', queryProductService);

  //var productService = angular.module('productServices', ['ngResource']);

// productService.factory('productService',function($resource){
  /**ngInject*/
  function productService($resource) {
    
  return $resource('http://localhost:8080/product/:id', {id: '@id'}, {
    update: {
      method: 'PUT', // this method issues a PUT request
      params: {
        name: '@name',
        description: '@description',
        totalPrice: '@totalPrice'
      }
    }
  });

}

  /**ngInject*/
  function totalCalService() {
    this.getTotalNetPrice = function (products) {
        var output = 0.0;

        for (var index = 0; index < products.length;index++) {
            var product = products[index];
            output += parseFloat(product.netPrice);
        }
        return output;
    }
}

  function queryProductService($resource) {
    return $resource('/getProduct/?name=:name',
        {query:{method:'GET',params:{name:''},isArray:true}

        });
}
  
})();
