'use strict';

angular.module('honoursApp').directive('sharedSpaceSidebar', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        replace:true,
        require: '^sharedSpace',
        templateUrl: 'components/sharedspace/sidebar/sidebar.html',
        link: function(scope, element, attrs, ctrl) {

        	scope.sharedSpaceSidebarView = 'none';

            scope.openToolbar = function(view){
            	scope.sharedSpaceSidebarView = view;
            	element.addClass('open');
            }

            

        }


        
    };
});
