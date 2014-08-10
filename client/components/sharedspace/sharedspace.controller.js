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


    this.spaceId = 'spaceID010101';


}


SharedSpaceCtrl.prototype.updateDoc = function(orig, updated, pIndex) {



}


SharedSpaceCtrl.prototype.returnId = function() {

	return 'spaceID010101';

}



SharedSpaceCtrl.$inject = ['$scope', '$http', 'socket', 'TopicServices', '$rootScope', 'Auth'];
angular.module('honoursApp').controller('SharedSpaceCtrl', SharedSpaceCtrl);
