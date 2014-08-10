    angular.module('honoursApp').directive('contenteditable', function(socket) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // view -> model

                elm.html(scope.object.content);

                elm.bind('blur', function() {
                    scope.$apply(function() {
                        ctrl.$setViewValue(elm.html());

                        var obj = scope.object;
                        obj.content = elm.html();;

                        socket.emitMessages('sharedspace:object:update', {
                            index: scope.$index,
                            obj: obj,
                            list: scope.$parent.SharedSpace.spaceId
                        });
                    });
                });

                // model -> view
                ctrl.$render = function() {
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());
            }
        };
    });