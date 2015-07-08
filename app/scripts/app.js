'use strict';

angular
  .module('myApp', [
    'ngRoute',
    'demo'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/demo1', {
        templateUrl: 'app/views/demo1.html'
      })
      .when('/demo2', {
        templateUrl: 'app/views/demo2.html'
      })
      .otherwise({
        redirectTo: '/demo2'
      });
  });
