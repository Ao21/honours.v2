'use strict';

var TopicsCtrl = function($scope, $http, socket, TopicServices) {
    var _this = this;
        this.$http = $http;
        this.$scope = $scope;
        this.socket = socket;
        this.TopicServices = TopicServices;

        this.connectVisible = false;



    $http.get('/api/topics').success(function(nodes) {
        _this.nodes = nodes;
        socket.syncUpdates('topic', _this.nodes);
    });



    $scope.addTopic = function(){
    	_this._addTopic();
    }
    $scope.connectTopics = function(){

    	_this.connectTopics();
    }

}

TopicsCtrl.prototype._addTopic = function(){
	var topic = {
		name:'Test Topic',
        radius:120,
        width:240,
        height:240
	};
	this.TopicServices.create(topic).then(function(data){
		//console.log(data);
	});
	this.$scope.tVDirectiveAddNode();
}

TopicsCtrl.prototype.connectTopics = function(){
    console.log(this.connectVisible);
	this.connectVisible = !this.connectVisible;
}


TopicsCtrl.$inject = ['$scope', '$http', 'socket', 'TopicServices'];
angular.module('honoursApp').controller('TopicsCtrl', TopicsCtrl);
