'use strict';

angular.module('honoursApp').directive('sharedSpaceAdd', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        controller: 'TopicsCtrl',
        templateUrl: 'components/sharedspace/sharedspace.html',
        link: function(scope, element, attrs, ctrl) {

            var currentView = "default";


        }


        
    };
});
