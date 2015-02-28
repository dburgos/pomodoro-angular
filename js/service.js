pomodoroApp.factory('localStorage', function ($q) {
  'use strict';
  var STORAGE_ID = 'pomodoro-angular';
  var store = {
    tasks: [],

    _saveToLocalStorage: function (tasks) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
    },

    add: function (task) {
      var deferred = $q.defer();

      store.tasks.push(task);

      store._saveToLocalStorage(store.tasks);
      deferred.resolve(store.tasks);

      return deferred.promise;
    }
  };

  return store;
});