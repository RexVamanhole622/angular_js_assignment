(function() {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItems);
  
    function FoundItems() {
      var ddo = {
        templateUrl: 'items.thtml',
        scope: {
          items: '<',
          onRemove: '&'
        }
      };
  
      return ddo;
    }
  
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;
      menu.found = [];
  
      //Implementaion for Filtering Items based on searchTerm
      menu.getMatchedMenuItems = function () {
        menu.found = []
        if (menu.searchTerm) {
          var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
          promise.then(function (response) {
            menu.found = response;
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
          });
        }
      };
  
      // Implementaion for removing item at given index
      menu.removeItem = function (index) {
        menu.found.splice(index, 1);
        if (menu.found.length == 0) {
          menu.error = "Nothing found";
        }
      }
    };
  
  
    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
  
      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
        }).then(function (result) {
  
          // process result and only keep items that match
          var items = result.data.menu_items;
          var foundItems = []
          for (var index = 0; index < items.length; index++) {
            if (items[index].description.indexOf(searchTerm) != -1) {
              foundItems.push(items[index]);
            }
          }
  
          // return processed items
          return foundItems;
        });
      };
  
    };
  
  })();