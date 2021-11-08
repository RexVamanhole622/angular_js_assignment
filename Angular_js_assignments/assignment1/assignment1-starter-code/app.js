(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject=['$scope'];
function LunchCheckController ($scope) {
 $scope.dishes="";
 $scope.fooditems= 0;
 $scope.message = "Please enter your lunch"; 
 $scope.color = "black";

 console.log(LunchCheckController);

$scope.checkLunch = function() { 
   
    $scope.fooditems= $scope.dishes.split(",").length;
   
    
    if ($scope.dishes==" " || $scope.dishes=="") {
      $scope.message = "Please Enter the data first";
      $scope.color="red";
    }
    else if ($scope.fooditems > 3) {
      $scope.message = "Too Much";
      $scope.color="red";
      }
    else if ($scope.fooditems < 4) {
      $scope.message="Enjoy!";
      $scope.color="green";
    }
  }
}
})();
