'use strict';

angular.module('honoursApp').directive('notifications', function($http, TopicServices) {
    return {
        restrict: 'E',
        scope:{
            topicId: '=topicId'
        },
        replace:true,
        templateUrl: 'components/topic/notifications/notifications.html',
        link: function(scope, element, attrs, ctrl) {
            scope.updates = TopicServices.latestUpdates(attrs.topicid).$object;

    }
}
});
