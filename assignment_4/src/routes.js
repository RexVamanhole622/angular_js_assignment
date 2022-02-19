(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');
    
$stateProvider

//home page
.state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
})

//categories page
.state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller:  'CategoriesController as catCrtl',
    resolve: {
        items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
        }]
    }
})

//items-list
.state('items', {
    url:'/items/{category}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
        items: ['MenuDataService', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.category);
        }]
    }
});

}

})();