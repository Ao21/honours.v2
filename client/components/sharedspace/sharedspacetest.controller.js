'use strict';

var SharedSpaceTest = function($scope, $http, socket, TopicServices, $rootScope, Auth) {
    var _this = this;
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.TopicServices = TopicServices;
    this.$rootScope = $rootScope;
    this.Auth = Auth;

    this.connectVisible = false;

    this.spaceId = 'spaceID010101';

    socket.emitMessages('sharedspace:join', {
		        userId: Auth.getCurrentUser()._id,
		        list: 'spaceID010101',
		    });


}


SharedSpaceTest.prototype.updateDoc = function(orig, updated, pIndex) {



}



SharedSpaceTest.$inject = ['$scope', '$http', 'socket', 'TopicServices', '$rootScope', 'Auth'];
angular.module('honoursApp').controller('SharedSpaceTest', SharedSpaceTest);
