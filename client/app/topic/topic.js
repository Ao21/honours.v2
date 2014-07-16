'use strict';

angular.module('honoursApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('topic', {
        url: '/topic',
        templateUrl: 'app/topic/topic.html',
        controller: 'TopicCtrl',
        controllerAs: 'Topic'
      });
  });