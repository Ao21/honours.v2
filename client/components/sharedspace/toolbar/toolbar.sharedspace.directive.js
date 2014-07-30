'use strict';

angular.module('honoursApp').directive('sharedSpaceToolbar', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        replace:true,
        require: '^sharedSpace',
        templateUrl: 'components/sharedspace/toolbar/toolbar.html',
        link: function(scope, element, attrs, ctrl) {

        	

        	scope.addDocument = function(){
        		ctrl.$scope.addObject({name:'newItem'});
        	}


        }


        
    };
});
