var pomodoroApp = angular.module('pomodoroApp', []);
pomodoroApp.controller('pomodoroCtrl',['$scope', '$interval',function($scope, $interval){

  var timer       = null;
  var active      = true;
  $scope.current  = null;
  $scope.tasks    = [];

  $scope.start = function() {
    var textEl = document.getElementById('newTask');
    $scope.current = {
      txt:  textEl.value,
      left: 1*60
    };
    runTimer();
    textEl.value = "";
    timer = $interval(function(){
      runTimer();
    }, 1000);
  };

  $scope.pause = function() {
    active = false;
  };

  $scope.resume = function() {
    active = true;
  };

  $scope.finish = function() {
    $scope.tasks.push($scope.current);
    $scope.current = null;
  };

  function getNowInSec() {
    return new Date().getTime()/1000;
  }

  function runTimer() {
    if(active) {
      $scope.current.left -= 1;
      if($scope.current.left <= 0) {
        $interval.cancel(timer);
        $scope.finish();
      }
    }

  }

 }]);