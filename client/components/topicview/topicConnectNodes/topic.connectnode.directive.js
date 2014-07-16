'use strict';

angular.module('honoursApp').directive('connectNode', function($http,TopicServices) {
    return {
        restrict: 'E',
        controller: 'TopicCtrl',
        templateUrl: 'components/topicview/topicConnectNodes/topic.connectnode.html',
        link: function(scope, element, attrs, ctrl) {
            
            scope.connectAccounts = function(){
                var cA = {
                source: scope.sourceNode,
                target: scope.targetNode,
                weight:1
            }
            console.log(cA);
            TopicServices.link(cA);
            }


        }



    };
});
