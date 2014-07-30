'use strict';

angular.module('honoursApp').directive('topicAdd', function($http, TopicServices) {
    return {
        restrict: 'E',

        replace:true,
        templateUrl: 'components/topic/add/add.html',
        link: function(scope, element, attrs, ctrl) {
            //scope.updates = TopicServices.latestUpdates(attrs.topicid).$object;
            scope.open = function(){
                element.addClass('open');
            }

    }
}
});
