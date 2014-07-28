'use strict';

angular.module('honoursApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'components/collabTextEditor/tEdit.html',
        controller: 'DocumentCtrl',
        controllerAs: 'TestEdit'
      });
  });