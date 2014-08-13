'use strict';

angular.module('honoursApp').directive('sharedSpace', function($http, socket, $timeout, TopicServices, $state, ObjectServices,CommentServices) {
    return {
        restrict: 'E',
        replace:true,
        controller:'SharedSpaceCtrl',
        templateUrl: 'components/sharedspace/sharedspace.html',
        link: function(scope, element, attrs, ctrl) {

            scope.objectList = [];
            scope.commentList = [];
            scope.commentMode = false;

            /*$(element[0]).mousedown(function (e) {
                   
                    $("#big-ghost").remove();
                    $(".dragArea").addClass("ghost-active");
                    $(".dragArea").css({
                        'left': e.pageX,
                        'top': e.pageY
                    });

                    initialW = e.pageX;
                    initialH = e.pageY;

                    $(document).bind("mouseup", selectElements);
                    $(document).bind("mousemove", openSelector);

                });

            function openSelector(e) {
                var w = Math.abs(initialW - e.pageX);
                var h = Math.abs(initialH - e.pageY);

                $(".dragArea").css({
                    'width': w,
                    'height': h
                });
                if (e.pageX <= initialW && e.pageY >= initialH) {
                    $(".dragArea").css({
                        'left': e.pageX
                    });
                } else if (e.pageY <= initialH && e.pageX >= initialW) {
                    $(".dragArea").css({
                        'top': e.pageY
                    });
                } else if (e.pageY < initialH && e.pageX < initialW) {
                    $(".dragArea").css({
                        'left': e.pageX,
                        "top": e.pageY
                    });
                }
            }*/

        	socket.recieveMessage('sharedspace:object:deleted', function(data) {
                scope.objectList.splice(data.index,1);
                scope.objectList =data.array;
            })

            socket.recieveMessage('sharedspace:comment:deleted', function(data) {
                scope.commentList.splice(data.index,1);
                scope.commentList =data.array;
            })

            socket.recieveMessage('sharedspace:object:updateAll', function(data) {
                scope.objectList =data;
            })

            socket.recieveMessage('sharedspace:comment:updateAll', function(data) {
                scope.commentList =data;
            })

        	

        	 ObjectServices.getObjectsBySpace('spaceID010101').then(function(data){
        	 	scope.objectList = data;
        	 });

             CommentServices.getCommentsBySpace('spaceID010101').then(function(data){
                console.log(data);
                scope.commentList = data;
             });


        	 scope.addShape = function(data){
                console.log('newshape')
                var tempObject = {name:'tempObject',type:'shape', 'spaceId':'spaceID010101'};
                ObjectServices.create(tempObject).then(function(object){
                    scope.objectList.push(object);
                    socket.emitMessages('sharedspace:object:create', {   
                        list: scope.SharedSpace.spaceId
                    });
                })
            }


            scope.addObject = function(data){
            	var tempObject = {name:'tempObject',type:'title', 'spaceId':'spaceID010101'};
            	ObjectServices.create(tempObject).then(function(object){
            		scope.objectList.push(object);
            		socket.emitMessages('sharedspace:object:create', {   
                        list: scope.SharedSpace.spaceId
                    });
            	})
            }

            scope.createComment = function(data){
                var tempObject = {name:'tempObject',type:'comment', 'spaceId':'spaceID010101','posx': data.posx,'posy':data.posy};
                CommentServices.create(tempObject).then(function(object){
                    scope.commentList.push(object);
                    socket.emitMessages('sharedspace:comment:create', {   
                        list: scope.SharedSpace.spaceId
                    });
                })
                                scope.commentMode = !scope.commentMode;

            }

            scope.turnOnCommentMode = function(data){
                scope.commentMode = !scope.commentMode;
                //var tempObject = {name:'tempObject',type:'commentGroup', 'spaceId':'spaceID010101', attachedTo:''};
                //scope.objectList.push(object);
                /*ObjectServices.createComment(tempObject).then(function(object){
                    scope.objectList.push(object);
                    socket.emitMessages('sharedspace:object:create', {   
                        list: scope.SharedSpace.spaceId
                    });
                })*/
            }


        }


        
    };
});
