var app = angular.module('nodeApp', []);

app.controller('nodeAppCtrl', ['$scope', 'Service', function($scope, Service) {
  function fetchWeather(selected_city) {
    Service.getData(labels,img).then(function(data){
      $scope.place = data;
    }); 
  }
  

  
  
}]);

app.factory('Service', ['$http', '$q', function ($http, $q){
  function addData (addlabel,addimg) {
 var deferred = $q.defer();

 $http.post('/models/mongo', {param1: 'addlabel'}, {param1: 'addimg'},function(data, textStatus, xhr) {
 console.log('data entered');
 });

   
    $http.get('models/mongo')
	
      .success(function(data){
        deferred.resolve(data.query.results.channel);
      })
      .error(function(err){
        console.log('Error retrieving data');
        deferred.reject(err);
      });
    return deferred.promise;
  }
  
  
}]);