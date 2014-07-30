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




}


SharedSpaceTest.prototype.updateDoc = function(orig, updated, pIndex) {



}



SharedSpaceTest.$inject = ['$scope', '$http', 'socket', 'TopicServices', '$rootScope', 'Auth'];
angular.module('honoursApp').controller('SharedSpaceTest', SharedSpaceTest);
