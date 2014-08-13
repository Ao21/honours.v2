Snap.plugin(function(Snap, Element, Paper, global) {

    Paper.prototype.connection = function(obj1, obj2, line, bg) {
        if (obj1.line && obj1.from && obj1.to) {
            line = obj1;
            obj1 = line.from;
            obj2 = line.to;
        }
        var bb1 = obj1.getBBox(),
            bb2 = obj2.getBBox(),
            p = [{
                x: bb1.x + bb1.width / 2,
                y: bb1.y - 1
            }, {
                x: bb1.x + bb1.width / 2,
                y: bb1.y + bb1.height + 1
            }, {
                x: bb1.x - 1,
                y: bb1.y + bb1.height / 2
            }, {
                x: bb1.x + bb1.width + 1,
                y: bb1.y + bb1.height / 2
            }, {
                x: bb2.x + bb2.width / 2,
                y: bb2.y - 1
            }, {
                x: bb2.x + bb2.width / 2,
                y: bb2.y + bb2.height + 1
            }, {
                x: bb2.x - 1,
                y: bb2.y + bb2.height / 2
            }, {
                x: bb2.x + bb2.width + 1,
                y: bb2.y + bb2.height / 2
            }],
            d = {},
            dis = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 4; j < 8; j++) {
                var dx = Math.abs(p[i].x - p[j].x),
                    dy = Math.abs(p[i].y - p[j].y);
                if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                    dis.push(dx + dy);
                    d[dis[dis.length - 1]] = [i, j];
                }
            }
        }
        if (dis.length == 0) {
            var res = [0, 4];
        } else {
            res = d[Math.min.apply(Math, dis)];
        }
        var x1 = p[res[0]].x,
            y1 = p[res[0]].y,
            x4 = p[res[1]].x,
            y4 = p[res[1]].y;
        dx = Math.max(Math.abs(x1 - x4) / 2, 10);
        dy = Math.max(Math.abs(y1 - y4) / 2, 10);
        var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
            y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
            x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
            y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
        var path = "M" + x1.toFixed(3) + "," + y1.toFixed(3) + "C" + [x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join();
        if (line && line.line) {
            line.bg && line.bg.attr({
                path: path
            });
            line.line.attr({
                path: path
            });
        } else {
            var color = typeof line == "string" ? line : "yellow";
            return {
                bg: bg && bg.split && this.path(path).attr({
                    stroke: bg.split("|")[0],
                    fill: "none",
                    "stroke-width": bg.split("|")[1] || 3
                }),
                line: this.path(path).attr({
                    stroke: color,
                    fill: "none"
                }),
                from: obj1,
                to: obj2
            };
        }
    }

});


angular.module('honoursApp').directive('shapeArrow', function($http, socket, $timeout, TopicServices, $state, $document) {
    return {
        restrict: 'EA',
        require: '^sharedSpace',
        replace: true,
        link: {
            pre: function(scope, element, attrs) {


            },
            post: function(scope, element, attrs) {



                var s = Snap('.svgLayer');
                var latestOptions = "";

                var dragger = function() {
                		latestOptions = "";
                        interact.enableDragging(false);
                        this.data("ox", this.type == "rect" ? this.attr("x") : this.attr("cx"));
                        this.data("oy", this.type == "rect" ? this.attr("y") : this.attr("cy"));
                        console.log();
                       
                    },
                    move = function(dx, dy) {
                        //interact.enableDragging(false);
                        var scale = 1;

                        if (scope.$parent.scale) {
                            scale = scope.$parent.scale;
                        }
                        var att = this.type == "rect" ? {
                            x: +this.data("ox") + (dx / scale),
                            y: +this.data("oy") + (dy / scale)
                        } : {
                            cx: +this.data("ox") + (dx / scale),
                            cy: +this.data("oy") + (dy / scale)
                        };
                        this.attr(att);
                        latestOptions = att;
                        for (var i = connections.length; i--;) {
                            s.connection(connections[i]);
                        }
                        // s.safari();
                    },
                    up = function() {
                        interact.enableDragging(true);
                       
                        var scale = 1;

                        if (scope.$parent.scale) {
                            scale = scope.$parent.scale;
                        }
                        var obj = scope.$parent.object;
                        if (this.hasClass('circle0')) {
                            obj.posx1 = latestOptions.cx;
                            obj.posy1 = latestOptions.cy;
                        } else if (this.hasClass('circle1')) {
                            obj.posx2 = latestOptions.cx;
                            obj.posy2 =  latestOptions.cy;
                        }
                        socket.emitMessages('sharedspace:object:update', {
                            index: scope.$parent.object.in,
                            obj: obj,
                            list: scope.$parent.$parent.SharedSpace.spaceId
                        });
                    };
                var scale = 1;

                if (scope.$parent.scale) {
                    scale = scope.$parent.$parent.scale;
                }

                var clickItem = function(data){
                    
                    if(data.ctrlKey===true){
                        socket.emitMessages('sharedspace:object:delete', {
                            index: scope.$index,
                            objIndex: scope.$parent.object.in,
                            list: scope.$parent.SharedSpace.spaceId
                        });
                        connections[0].line.remove();this.parent().remove()
                        //$(data.target).parent().parent().remove()

                    }
                }

                socket.recieveMessage('sharedspace:object:updates', function(data) {
                if (data.id === scope.object.id) {
                    if(data.posx1&&data.posy1&&data.posx2&&data.posy2){
                        var att = {
                            cx: data.posx1,
                            cy: data.posy1
                        };
                        var att2 = {
                            cx: data.posx2,
                            cy: data.posy2
                        };
                        shapes[0].attr(att);
                        shapes[1].attr(att2);
                        for (var i = connections.length; i--;) {
                            s.connection(connections[i]);
                        }
                        //console.log(shapes[0].data);
                        /*this.data("ox", this.type == "rect" ? this.attr("x") : this.attr("cx"));
                        this.data("oy", this.type == "rect" ? this.attr("y") : this.attr("cy"));*/
                    }
                    //scope.object.content = data.content;
                  
                }
            })
                
                var x = (-$('.boardArea').offset().left + angular.element(window).width() / 2) / scale; var y = (-$('.boardArea').offset().top + angular.element(window).height() / 2) / scale;

                var posx = scope.$parent.object.posx1 || x+100;
                var posy = scope.$parent.object.posy1 || y+30;
                var posx1 = scope.$parent.object.posx2 || x+15;
                var posy1 = scope.$parent.object.posy2 || y+30;

                var shapes = [s.circle(posx, posy, 15), s.circle(posx1, posy1, 15)]
                for (var i = 0, ii = shapes.length; i < ii; i++) {
                    shapes[i].addClass('circle' + i);
                    shapes[i].drag(move, dragger, up);
                    shapes[i].click(clickItem);

                }



                var groups = s.group(shapes[0], shapes[1]);
                groups.addClass('svgId-' + scope.$parent.object.in);
                //var shapesGroup =  s.group(shapes);
                var connections = [];
                connections.push(s.connection(shapes[0], shapes[1], "white"));


            }
        }
    };
})
