'use strict';

angular.module('honoursApp').directive('collaborativeTextEdit', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        controller: 'TopicsCtrl',
        templateUrl: 'components/collabTextEditor/tEdit.html',
        link: function(scope, element, attrs, ctrl) {


        }
    }
})


