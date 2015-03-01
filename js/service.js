pomodoroApp.factory('localStorage', function ($q) {
  'use strict';
  var STORAGE_ID = 'pomodoro-angular';
  var store = {
    tasks: [],

    _getFromLocalStorage: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

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

  store.tasks = store._getFromLocalStorage();

  return store;
});