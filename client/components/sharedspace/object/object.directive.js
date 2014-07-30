'use strict';

angular.module('honoursApp').directive('sharedSpaceObject', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'E',
        require: '^sharedSpace',
        replace:true,
        templateUrl: 'components/sharedspace/object/object.html',
        link: function(scope, element, attrs, ctrl) {


            var x = parseInt(attrs.posx),
                y = parseInt(attrs.posy);
                console.log();
              if(attrs.posx===''){
                console.log('hi');
                  x = 4500 + angular.element(window).width()/2 , y = 2500+ angular.element(window).height()/2;
                }
              element.css('transform','translate3d('+x+'px,'+y+'px,0');

            interact(element.find('.move').get(0))

                .draggable({
                    onmove: function(event) {
                        var scale = 1;

                        if(angular.element.find('.boardArea')[0].attributes.scale){
                            scale = angular.element.find('.boardArea')[0].attributes.scale.value
                        }

                        x += event.dx/scale;
                        y += event.dy/scale;

                        //event.target.setAttribute('data-x', event.pageX|0);
                        //event.target.setAttribute('data-y', event.pageY|0);
                        
                        element[0].style.webkitTransform =
                            element[0].style.transform =
                            'translate3d(' + x +  'px, ' + y + 'px,0)';
                    },
                    onend: function(event) {
                        
                    }
                })
                .inertia(false)
                .restrict({
                    drag: "parent",
                    endOnly: true
                });


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
                
                var scale = 1;  // scale of the image
                var xLast = -4500;  // last x location on the screen
                var yLast = -2500;  // last y location on the screen
                var xImage = -4500; // last x location on the image
                var yImage = -2500; // last y location on the image


            element.on('mousewheel',function(e){

                        // find current location on screen 
                       var xScreen = e.pageX - $(this).offset().left;
                       var yScreen = e.pageY - $(this).offset().top;

                       
                       // determine the new scale
                       if (e.originalEvent.wheelDelta > 0)
                       {
                           scale *= 1.05;
                       }
                       else
                       {
                           scale /= 1.05;
                       }
                       scale = scale < 0.5 ? 0.5 : (scale > 4 ? 4 : scale);
                       // determine the location on the screen at the new scale

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
                            'scale(' + scale + ')' + 'translate3d(' + x +  'px, ' + y + 'px, 0) ';


                       // redraw
                       element.find('.boardArea').css('-webkit-transform-origin', e.clientX + 'px ' + e.clientY + 'px');
                    element.find('.boardArea').get(0).setAttribute('scale',scale);
                       return false;
            })
            interact(element.find('.boardArea').get(0))
                .draggable({
                    onmove: function(event) {

                        var xScreen = event.pageX - element.offset().left;
                       var yScreen = event.pageY - element.offset().top;
                        xImage = xImage + ((xScreen - xLast) / scale);
                       yImage = yImage + ((yScreen - yLast) / scale);

                        var scale = 1;

                        if(angular.element.find('.boardArea')[0].attributes.scale){
                            scale = angular.element.find('.boardArea')[0].attributes.scale.value
                        }
                        scale = scale < 0.5 ? 0.5 : (scale > 64 ? 64 : scale);
                        x += event.dx/scale;
                        y += event.dy/scale;

                         angular.element.find('.boardArea')[0].style.webkitTransform =
                            angular.element.find('.boardArea')[0].style.transform =
                            'scale(' + scale + ')' + 'translate3d(' + x +  'px, ' + y + 'px, 0)';


                       // element.find('.boardArea').css('-webkit-transform-origin', xImage + 'px ' + yImage + 'px');
                        
                    },
                    onend: function(event) {
                        
                    }
                })
                .ignoreFrom('input, textarea, a,.object')
                .inertia(false)
                
            }
        };
    }
]);
