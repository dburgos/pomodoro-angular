pomodoroApp.controller('pomodoroCtrl',['$scope', '$interval','localStorage', function($scope, $interval, store){
  'use strict';
  var timer       = null;
  $scope.active   = true;
  $scope.current  = null;
  $scope.tasks    = store.tasks;

  $scope.start = function() {
    var textEl = document.getElementById('newTask');
    $scope.current = {
      txt:  textEl.value,
      left: 25*60
    };
    textEl.value = "";
    _runTimer();
    timer = $interval(function(){
      _runTimer();
    }, 1000);
  };

  $scope.pause = function() {
    $scope.active = false;
  };

  $scope.resume = function() {
    $scope.active = true;
  };

  $scope.finish = function() {
    store.add($scope.current)
      .then(function success() {
        $scope.current = null;
      });
  };

  var _runTimer = function() {
    if($scope.active) {
      $scope.current.left -= 1;
      if($scope.current.left <= 0) {
        $interval.cancel(timer);
        $scope.finish();
      }
    }
  }

 }]);