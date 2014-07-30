'use strict';

angular.module('honoursApp').directive('sharedSpace', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        replace:true,
        controller:'SharedSpaceCtrl',
        templateUrl: 'components/sharedspace/sharedspace.html',
        link: function(scope, element, attrs, ctrl) {

        	scope.objectList = [];

            scope.addObject = function(data){
            	scope.objectList.push(data);
            }


        }


        
    };
});
