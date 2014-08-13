'use strict';

angular.module('honoursApp').directive('sharedSpaceObject', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace: true,
        templateUrl: 'components/sharedspace/object/object.html',
        link: { post:function(scope, element, attrs){


            socket.recieveMessage('sharedspace:object:updates', function(data) {
                if (data.id === scope.object.id) {
                    scope.object.content = data.content;
                    if(data.width||data.height){
                        element[0].style.webkitTransform =
                            element[0].style.width =
                            data.width;
                         element[0].style.webkitTransform =
                            element[0].style.height =
                            data.height;
                    }
                    element[0].style.webkitTransform =
                        element[0].style.transform =
                        'translate3d(' + data.posx + 'px, ' + data.posy + 'px,0)';
                }
            })


            element.find('.trash').click(function() {
                socket.emitMessages('sharedspace:object:delete', {
                    index: scope.$index,
                    objIndex: scope.object.in,
                    list: scope.$parent.SharedSpace.spaceId
                });
                scope.$apply(function() {
                    //scope.$parent.objectList.splice(scope.$index,1);

                })

            })


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
            //element.css('transform', 'translate3d(' + x + 'px,' + y + 'px,0');
            interact(element.find('.move').get(0))
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


                        socket.emitMessages('sharedspace:object:update', {
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
                        y -= (angular.element(element[0]).height());


                        element[0].style.webkitTransform =
                            element[0].style.transform =
                            'translate(' + x + 'px, ' + y + 'px)';
                        var obj = scope.object
                        obj.posx = x;
                        obj.posy = y;


                        socket.emitMessages('sharedspace:object:update', {
                            index: scope.$index,
                            obj: obj,
                            list: scope.$parent.SharedSpace.spaceId
                        });

                    }
                })
                .inertia(true)
                .restrict({
                    drag: "parent",
                    endOnly: true
                });





}
        }
    };
})



angular.module('honoursApp').directive('sharedSpaceCommentMode', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        link: function(scope, element, attrs, ctrl) {
            scope.addComment = function(e){
                //current Position
                var newCommentWindow = {
                    posx : e.offsetX,
                    posy : e.offsetY
                }
                scope.SharedSpace.$scope.createComment(newCommentWindow);
            }


            scope.deleteComment = function(){
                console.log('hi');
            }
        }



    };
})



angular.module('honoursApp').directive('sharedSpaceObjectImage', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace: true,
        templateUrl: 'components/sharedspace/object/object-image.html',
        link: function(scope, element, attrs, ctrl) {}



    };
})


angular.module('honoursApp').directive('sharedSpaceObjectNote', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace: true,
        templateUrl: 'components/sharedspace/object/object-note.html',
        link: function(scope, element, attrs, ctrl) {


        }



    };
})


angular.module('honoursApp').directive('sharedSpaceObjectShape', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace: true,
        templateUrl: 'components/sharedspace/object/object-shape.html',
        link: function(scope, element, attrs, ctrl) {


        }



    };
})



angular.module('honoursApp').directive('sharedSpaceObjectDocument', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace: true,
        templateUrl: 'components/sharedspace/object/object-document.html',
        link: function(scope, element, attrs, ctrl) {


        }



    };
})



angular.module('honoursApp').directive('resizeable', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'EA',
        link: {
            pre: function preLink(scope, iElement, iAttrs, controller) {

            },
            post: function postLink(scope, iElement, iAttrs, controller) {
                iElement[0].style.width = iAttrs.obwidth || '200px';
                iElement[0].style.height = iAttrs.obheight || '200px';
                //iElement.height(iElement[0].offsetHeight )
                //iElement.width(iElement[0].offsetHeight )
                interact(iElement[0])
                    .resizeable(true)
                    .on('resizemove', function(event) {
                        var target = event.target;


                        var scale = 1;

                        if (scope.$parent.scale) {
                            scale = scope.$parent.scale;
                        }


                        // add the change in coords to the previous width of the target element
                        var
                            newWidth = parseFloat(target.style.width) + (event.dx / scale),
                            newHeight = parseFloat(target.style.height) + (event.dy / scale);
                        // update the element's style
                        target.style.width = newWidth + 'px';
                        target.style.height = newHeight + 'px';

                        console.log();
                        iElement[0].children[0].children[0].style.fontSize = newHeight * 0.5 + 'px';


                        var obj = scope.object
                        obj.width = newWidth + 'px';
                        obj.height = newHeight + 'px';

                        socket.emitMessages('sharedspace:object:update', {
                            index: scope.$index,
                            obj: obj,
                            list: scope.$parent.SharedSpace.spaceId
                        });

                    });
            }
        }




    };
})

.directive('draggablezoomable', ['$document',
    function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var x = -4500,
                    y = -2500;

                var scale = 1; // scale of the image
                var xLast = -4500; // last x location on the screen
                var yLast = -2500; // last y location on the screen
                var xImage = -4500; // last x location on the image
                var yImage = -2500; // last y location on the image


                element.on('mousewheel', function(e) {

                    // find current location on screen 
                    var xScreen = e.pageX - $(this).offset().left;
                    var yScreen = e.pageY - $(this).offset().top;


                    // determine the new scale
                    if (e.originalEvent.wheelDelta > 0) {
                        scale *= 1.05;
                    } else {
                        scale /= 1.05;
                    }
                    scale = scale < 0.5 ? 0.5 : (scale > 4 ? 4 : scale);
                    // determine the location on the screen at the new scale

                    scope.scale = scale;

                    // find current location on the image at the current scale
                    xImage = xImage + ((xScreen - xLast) / scale);
                    yImage = yImage + ((yScreen - yLast) / scale);

                    var xNew = (xScreen - xImage) / scale;
                    var yNew = (yScreen - yImage) / scale;

                    // save the current screen location
                    xLast = xScreen;
                    yLast = yScreen;



                    //e.clientX / scale + xImage - e.clientX / ( scale * zoom )

                    angular.element.find('.boardArea')[0].style.webkitTransform =
                        angular.element.find('.boardArea')[0].style.transform =
                        'scale(' + scale + ')' + 'translate3d(' + x + 'px, ' + y + 'px, 0) ';


                    // redraw
                    element.find('.boardArea').css('-webkit-transform-origin', e.clientX + 'px ' + e.clientY + 'px');
                    element.find('.boardArea').get(0).setAttribute('scale', scale);
                    return false;
                })
                interact(element.find('.boardArea').get(0))
                    .actionChecker(function(event, action) {
                        if(event.altKey===true){
                            return event.altKey === true ? action:null;
                        }
                        return event.button === 1 ? action : null;
                    })
                    .draggable({
                        onmove: function(event) {
                            element.addClass('dragging');

                            var xScreen = event.pageX - element.offset().left;
                            var yScreen = event.pageY - element.offset().top;
                            xImage = xImage + ((xScreen - xLast) / scale);
                            yImage = yImage + ((yScreen - yLast) / scale);

                            var scale = 1;

                            if (angular.element.find('.boardArea')[0].attributes.scale) {
                                scale = angular.element.find('.boardArea')[0].attributes.scale.value
                            }
                            scale = scale < 0.5 ? 0.5 : (scale > 64 ? 64 : scale);
                            x += event.dx / scale;
                            y += event.dy / scale;

                            angular.element.find('.boardArea')[0].style.webkitTransform =
                                angular.element.find('.boardArea')[0].style.transform =
                                'scale(' + scale + ')' + 'translate3d(' + x + 'px, ' + y + 'px, 0)';


                            // element.find('.boardArea').css('-webkit-transform-origin', xImage + 'px ' + yImage + 'px');

                        },
                        onend: function(event) {
                            element.removeClass('dragging');
                        }
                    })
                    .styleCursor(false)
                    .ignoreFrom('input, textarea, a,.object')
                    .inertia(false)

            }
        };
    }
]);
