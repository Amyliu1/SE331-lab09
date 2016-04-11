(function() {
'use strict';

// var productMainController = angular.module('productMainController', ['productServices']);
angular.module('app')
  .controller('addProductController',addProductController)
  .controller('listProductController',listProductController)
  .controller('editProductController',editProductController);
// productMainController.controller('addProductController', ['$scope', '$http', '$location', '$rootScope','productService',
//     function ($scope, $http, $location, $rootScope,productService) {
  /**ngInject*/
  function addProductController($http,$location,$rootScope,productService) {
    var vm = this;
    vm.product = {};
    vm.addPerson = true;
    vm.editPerson = false;
    vm.addProduct = function (flowFiles) {
            productService.save(vm.product, function (data){
                var productid = data.id;
                flowFiles.opts.target = 'http://localhost:8080/productImage/add';
                flowFiles.opts.testChunks = false;
                flowFiles.opts.query = {productid:productid};
                flowFiles.upload();

            
            $rootScope.addSuccess = true;
            $location.path("listProduct");
        })
        }


    }

// productMainController.controller('listProductController', ['$scope', '$http', '$rootScope','productService','$route','totalCalService','queryProductService',
//     function ($scope, $http, $rootScope,productService,$route,totalCalService,queryProductService) {
  /**ngInject*/
  function listProductController($http,$scope,$rootScope,productService,queryProductService,$route) {
    //$http.get("/product/").success(function (data) {
    var vm = this;
    var data = productService.query(function () {
      // $scope.totalNetPrice= totalCalService.getTotalNetPrice(data);
      vm.products = data;
    })


    $scope.$on('$locationChangeStart', function () {
      $rootScope.addSuccess = false;
      $rootScope.editSuccess = false;
      $rootScope.deleteSuccess = false;
    })

    vm.deleteProduct = function (id) {
      var answer = confirm("Do you want to delete the product?");
      if (answer) {
        productService.delete({id: id}, function () {
          $rootScope.deleteSuccess = true;
          $route.reload();
        })
      }
    }

    vm.searchProduct = function (name) {
      queryProductService.query({name: name}, function (data) {
        vm.products = data;
      })
    }

  }

// productMainController.controller('editProductController', ['$scope', '$http', '$routeParams', '$location', '$rootScope','productService',
//     function ($scope, $http, $routeParams, $location, $rootScope,productService) {
  /**ngInject*/
  function editProductController($routeParams,$http,$location,$rootScope,productService) {
    var vm = this;
    vm.addPerson = false;
    vm.editPerson = true;
    var id = $routeParams.id;
    $http.get("http://localhost:8080/product/" + id).success(function (data) {
      vm.product = data;
    })

    vm.editProduct = function (flowFiles) {
      //$http.put("/product", $scope.product).then(function () {
      productService.update({
        id: vm.product.id,
        name: vm.product.name,
        description: vm.product.description,
        totalPrice: vm.product.totalPrice
      }, function (data) {
        var productid = data.id;
        flowFiles.opts.target = 'http://localhost:8080/productImage/add';
        flowFiles.opts.testChunks = false;
        flowFiles.opts.query = {productid: productid};
        flowFiles.upload();
        $rootScope.editSuccess = true;
        $location.path("listProduct");
        vm.$apply();
      })
    }
    vm.removeImage = function (pId, imgId) {
      var ans = confirm("Do you want to delete the image?");
      if (ans == true) {
        $http.delete("http://localhost:8080/productImage/remove?productid=" + pId + "&imageid=" + imgId).then(function () {
          $http.get("http://localhost:8080/product" + pId).success(function (data) {
            vm.product = data;
          })
        }, function () {
          
        })
      }
    }


  }

})();
