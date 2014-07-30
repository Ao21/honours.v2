'use strict';

angular.module('honoursApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test2', {
        url: '/test2',
        templateUrl: 'components/sharedspace/sharedspacetest.html',
        controller: 'SharedSpaceTest',
        controllerAs: 'SharedSpace'
      });
  });