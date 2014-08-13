angular.module('honoursApp').directive('sharedSpaceObjectComment', function($http, socket, $timeout, TopicServices, $state, $document, Auth) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace: true,
        templateUrl: 'components/sharedspace/object/types/object-comment.html',
        link: function(scope, element, attrs, ctrl) {

            scope.commentOpen = false;
            scope.comments = [];

            if (scope.object.comments) {
                for (var i = 0; i < scope.object.comments.length; i++) {
                    scope.comments.push(scope.object.comments[i]);
                };
            }


            socket.recieveMessage('sharedspace:comment:updates', function(data) {
                if (data.id === scope.object.id) {
                    scope.object.content = data.content;
                    scope.comments = data.comments;
                    element[0].style.webkitTransform =
                        element[0].style.transform =
                        'translate3d(' + data.posx + 'px, ' + data.posy + 'px,0)';
                }
            })


            element.find('.trash').click(function() {
                socket.emitMessages('sharedspace:comment:delete', {
                    index: scope.$index,
                    objIndex: scope.object.in,
                    list: scope.$parent.SharedSpace.spaceId
                });
            });


            var x = parseInt(attrs.posx),
                y = parseInt(attrs.posy);

            var scale = 1;

            if (scope.$parent.scale) {
                scale = scope.$parent.scale;
            }

            if (attrs.posx === '') {
                x = (-$('.boardArea').offset().left + angular.element(window).width() / 2) / scale, y = (-$('.boardArea').offset().top + angular.element(window).height() / 2) / scale;
            }

            element[0].style.webkitTransform =
                element[0].style.transform =
                'translate(' + x + 'px, ' + y + 'px)';


            /**
             *
             * Moveable Stuff
             *
             **/

            interact(element.get(0))
                .draggable({
                    onmove: function(event) {
                        var scale = 1;

                        if (scope.$parent.scale) {
                            scale = scope.$parent.scale;
                        }


                        x += event.dx / scale;
                        y += event.dy / scale;

                        //event.target.setAttribute('data-x', event.pageX|0);
                        //event.target.setAttribute('data-y', event.pageY|0);

                        var obj = scope.object
                        obj.posx = x;
                        obj.posy = y;


                        socket.emitMessages('sharedspace:comment:update', {
                            index: scope.$index,
                            obj: obj,
                            list: scope.$parent.SharedSpace.spaceId
                        });





                        element[0].style.webkitTransform =
                            element[0].style.transform =
                            'translate(' + x + 'px, ' + y + 'px)';
                    },
                    onend: function(event) {
                        //x -= (angular.element(element[0]).width()/2);
                        //y -= (angular.element(element[0]).height());


                        element[0].style.webkitTransform =
                            element[0].style.transform =
                            'translate(' + x + 'px, ' + y + 'px)';
                        var obj = scope.object
                        obj.posx = x;
                        obj.posy = y;


                        socket.emitMessages('sharedspace:comment:update', {
                            index: scope.$index,
                            obj: obj,
                            list: scope.$parent.SharedSpace.spaceId
                        });

                    }
                })
                .inertia(true)
                .ignoreFrom('.commentList ')
                .restrict({
                    drag: "parent",
                    endOnly: true
                });


            /**
             *
             * Open
             *
             **/

            scope.openComment = function() {
                scope.commentOpen = true
            }

            scope.closeComment = function() {
                scope.commentOpen = false;
            }

            scope.deleteComment = function() {
                socket.emitMessages('sharedspace:comment:delete', {
                    index: scope.$index,
                    objIndex: scope.object.in,
                    list: scope.$parent.SharedSpace.spaceId
                });

            }


            /**
             *
             * Add Comment to this comment
             *
             **/

            scope.attachComment = function() {
                if (scope.comment) {

                    var comment = {
                        content: scope.comment,
                        user: Auth.getCurrentUser(),
                        created: new Date()
                    }
                    scope.comment = '';
                    scope.comments.push(comment);
                    var obj = scope.object
                    obj.comments = scope.comments;
                    delete obj.$$hashKey;

                    socket.emitMessages('sharedspace:comment:update', {
                        index: scope.$index,
                        obj: obj,
                        list: scope.$parent.SharedSpace.spaceId
                    });
                }
            }

        }
    };
});



angular.module('honoursApp').directive('autoGrow', function() {
    return function(scope, element, attr) {
        var minHeight = element[0].offsetHeight,
            paddingLeft = element.css('paddingLeft'),
            paddingRight = element.css('paddingRight');

        var $shadow = angular.element('<div></div>').css({
            position: 'absolute',
            top: -10000,
            left: -10000,
            width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
            fontSize: element.css('fontSize'),
            fontFamily: element.css('fontFamily'),
            lineHeight: element.css('lineHeight'),
            resize: 'none'
        });
        angular.element(document.body).append($shadow);

        var update = function() {
            var times = function(string, number) {
                for (var i = 0, r = ''; i < number; i++) {
                    r += string;
                }
                return r;
            }

            var val = element.val().replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/&/g, '&amp;')
                .replace(/\n$/, '<br/>&nbsp;')
                .replace(/\n/g, '<br/>')
                .replace(/\s{2,}/g, function(space) {
                    return times('&nbsp;', space.length - 1) + ' '
                });
            $shadow.html(val);

            element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */ , minHeight) + 'px');
        }

        element.bind('keyup keydown keypress change', update);
        update();
    }
});
