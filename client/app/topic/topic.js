'use strict';

angular.module('honoursApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('topic', {
        url: '/topics/:id',
        templateUrl: 'app/topic/topic.html',
        controller: 'TopicCtrl',
        controllerAs: 'Topic'
      });
  });