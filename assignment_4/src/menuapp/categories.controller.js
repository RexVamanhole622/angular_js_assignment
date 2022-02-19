(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);
    
    
    CategoriesController.$inject = ['items'];//"items"get from method in menudata.service
    function CategoriesController(items) {
      var catCtrl = this;
      catCtrl.items = items;
    }
    
    })();
    