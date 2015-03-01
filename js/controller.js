pomodoroApp.controller('pomodoroCtrl',['$scope', '$interval','localStorage', function($scope, $interval, store){
  'use strict';
  var timer       = null;
  $scope.active   = true;
  $scope.current  = null;
  $scope.tasks    = store.tasks;

  $scope.start = function() {
    // Cache DOM element
    var textEl = document.getElementById('newTask');
    // Save current task
    $scope.current = {
      txt:  textEl.value,
      left: 11*60
    };
    // Clean task description
    textEl.value = "";
    // Execute timer
    _runTimer();
    // Set a 1s interval for the timer
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

  $scope.humanizeTimeleft = function() {
    var minutes = Math.floor($scope.current.left / 60);
    var seconds = $scope.current.left - minutes * 60;
    return _pad(minutes,2) + ':' + _pad(seconds,2);
  };

  var _runTimer = function() {
    if($scope.active) {
      $scope.current.left -= 1;
      if($scope.current.left <= 0) {
        $interval.cancel(timer);
        $scope.finish();
      }
    }
  };

  var _pad = function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  };

 }]);