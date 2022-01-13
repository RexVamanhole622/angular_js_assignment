(function () {
  'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)//bind to parent page as found-items
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowCtrl = this;

  narrowCtrl.searchMenuItems = function () { //method searchMenuItems use as hooking th eng-click on html page
    if (narrowCtrl.searchTerm === "" || narrowCtrl.searchTerm===undefined) {
      narrowCtrl.found = [];
    } else {
      MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
      .then(function(result) {
        narrowCtrl.found = result;
      });
    }
  }

  narrowCtrl.removeItem = function(itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

//**********reminder: The whole Directive section control the template performence overall */
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundCtrl = this;
  foundCtrl.isBeforeSearch = function() {
    return foundCtrl.items == undefined;
  }
  foundCtrl.isNothingFound = function() {
    return foundCtrl.items != undefined && foundCtrl.items.length === 0;
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result) {
      var allItems = result.data.menu_items;
      foundItems = [];
      for (var index = 0; index < allItems.length; ++index) {
        if (allItems[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
        //if searchTerm of.json file were found (>0), show it's pror of description as well

                    //>=0 means equal items that found; -1 equal not found
                    //Once it gets all the menu items, 
                    //it should loop through them to pick out the ones whose description matches the searchTerm
          foundItems.push(allItems[index]);
        }
      }
      return foundItems;
    });
  };

  service.removeItem = function(itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

}

})();
