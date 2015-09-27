var app = angular.module('StockDash', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('/', {
      url: '/home',
      templateUrl: 'views/home.html'
    })
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard.html'
    })
    .state('news', {
      url: '/news',
      templateUrl: 'views/news.html'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'views/search.html',
      controller: 'searchCtrl'
    });
}]);


app.controller('stockCtrl', function($scope, $state, $location) {

});

app.controller('dashboardCtrl', function($scope, $state, $http){
  // $scope.currentUser;
  $scope.getCurrentUser = function() {
    console.log('hey');
    // return $http.get('/currentuser')
    // .success(function(data) {
    //   console.log(data);
    //   $scope.currentUser = data;
    // });
  };
});

app.controller('aboutCtrl', function($scope, $state){
  console.log('hello');
});

app.controller('searchCtrl', function($scope, $state, $http){
  $scope.stockInfo = [];
  $scope.stockData =[];
  $scope.shown = false;
  $scope.findBySymbol = function() {
    $scope.stockInfo = [];
    $scope.stockData =[];
    // console.log(symbol);
    $http.jsonp("http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input="+$scope.symbol+"&callback=JSON_CALLBACK")
      .success(function(data) {
      $scope.stockInfo = data;
      console.log($scope.stockInfo[0]);
      $http.jsonp("http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol="+$scope.stockInfo[0].Symbol+"&callback=JSON_CALLBACK")
        .success(function(timeData) {
        $scope.stockData = timeData;
        console.log($scope.stockData);
      });
      console.log($scope.shown);
      // return $scope.shown;
    });
    return $scope.shown = true;
  };
});



// app.service('searchService', function($scope, $state, $http) {
//   function getStock(stockSymbol) {
//     return $http.jsonp('http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A1825%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22' + stockSymbol + '%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D&callback=JSON_CALLBACK');
//   }
// });




// Lookup by symbol:
// "http://dev.markitondemand.com/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22"+symbol+"%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";

// lookup by ticker or name: probably have to use %20 or whatever for multi-word companies
// "http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input="+company ticker or name+"&callback=myFunction"

// for current value
//"http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol="+ticker+"&callback=myFunction"
