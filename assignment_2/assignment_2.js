(function () {
'use strict'

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
var buyItem = this;

    buyItem.shoppingList = ShoppingListCheckOffService.getToBuyItems();

        buyItem.buy = function (itemIndex) {
            ShoppingListCheckOffService.buy (itemIndex);
        };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
var boughtItem = this;
boughtItem.alreadyBoughtList = ShoppingListCheckOffService.getBoughtItem ();

}


function ShoppingListCheckOffService () {
    var service = this;
    var shoppingList= [
        {itemName: "Apple", itemQuantity: "2 bags"},
        {itemName:"Cookies", itemQuantity: "4 boxs"},
        {itemName:"Avocado", itemQuantity: "1 bag"},
        {itemName:"Beer", itemQuantity: "10 packs"},
        {itemName:"Chocolate", itemQuantity: "1 pack"},
    ];

    var alreadyBoughtList = [];
    
    service.buy = function (itemIndex) {
        var item = shoppingList [itemIndex];
        alreadyBoughtList.push(item);
        shoppingList.splice(itemIndex, 1)
    };
    
    //prototype syntax:
    //$scope.moveToListB = function () {
    //     $scope.listB.push(item);
    //     $scope.listA.splice($scope.listA.indexOf(item), 1);
    // }
    
        service.getToBuyItems = function () {
            return shoppingList;
        };

        service.getBoughtItem = function () {
            return alreadyBoughtList;
        };

        //console.log(shoppingList);
};






    
})()