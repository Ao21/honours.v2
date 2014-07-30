'use strict';

var SharedSpaceCtrl = function($scope, $http, socket, TopicServices, $rootScope, Auth) {
    var _this = this;
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.TopicServices = TopicServices;
    this.$rootScope = $rootScope;
    this.Auth = Auth;

    this.connectVisible = false;



}


SharedSpaceCtrl.prototype.updateDoc = function(orig, updated, pIndex) {



}



SharedSpaceCtrl.$inject = ['$scope', '$http', 'socket', 'TopicServices', '$rootScope', 'Auth'];
angular.module('honoursApp').controller('SharedSpaceCtrl', SharedSpaceCtrl);
