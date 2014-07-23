'use strict';

angular.module('honoursApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('topics', {
        url: '/topics',
        templateUrl: 'app/topics/topics.html',
        controller: 'TopicsCtrl',
        controllerAs: 'Topic'
      });
  });