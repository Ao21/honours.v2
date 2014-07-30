'use strict';

var TopicCtrl = function($scope, $http, socket,$stateParams, TopicServices) {
        var _this = this;
        this.$http = $http;
        this.$scope = $scope;
        this.socket = socket;
        this.TopicServices = TopicServices;


        this.params = $stateParams;


    


    $scope.getTopic = function(){
    }

    $scope.connectTopics = function(){

    }

}

TopicCtrl.prototype.getTopic = function(){
    this.$scope.open();
}

TopicCtrl.prototype.connectTopics = function(){
   
}


TopicCtrl.$inject = ['$scope', '$http', 'socket', '$stateParams', 'TopicServices'];
angular.module('honoursApp').controller('TopicCtrl', TopicCtrl);
