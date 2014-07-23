'use strict';

angular.module('honoursApp').directive('topicView', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        controller: 'TopicsCtrl',
        templateUrl: 'components/topicview/topicview.html',
        link: function(scope, element, attrs, ctrl) {


            scope.tVDirectiveAddNode = function() {
                //console.log('added');
            }


            function checkKey() {
                //console.log();
            }



            var margin = {
                    top: -5,
                    right: -5,
                    bottom: -5,
                    left: -5
                },
                width = angular.element(window).width() - margin.left - margin.right,
                height = angular.element(window).height() - margin.top - margin.bottom;

            var color = d3.scale.category20();


            var nodeMouseDown = false;


            function zoomed() {
                if (nodeMouseDown) return;
                vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
            }

            var colaObj = d3.layout.force()
                .size([width, height])
                .gravity(.01)
                .linkDistance(function(d) {
                    return d.source.width + d.target.width + 50;
                })
                .charge(-600)

            var nodes = colaObj.nodes(),
                links = colaObj.links();

            var hash_lookup = [];

            colaObj.defaultNodeSize = 50;


            var zoom = d3.behavior.zoom()
                .scaleExtent([1, 10])
                .on("zoom", zoomed);

            var svg = d3.select("topic-view").append("svg")
                .attr("id", "playgraph")
                //better to keep the viewBox dimensions with variables
                .attr("viewBox", "0 0 " + width + " " + height)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .attr("transform", "translate(" + margin.left + "," + margin.right + ")")


            svg.append('rect')
                .attr('class', 'background')
                .attr('width', "100%")
                .attr('height', "100%")
                .call(d3.behavior.zoom().on("zoom", zoomed));

            var vis = svg
                .append('g');

            var container = svg.append("g");



            var drag = d3.behavior.drag()
                .origin(function(d) {
                    return d;
                })
                .on("dragstart", dragstarted)
                .on("drag", dragged)
                .on("dragend", dragended);

            function dragstarted(d) {
                //d3.event.sourceEvent.stopPropagation();
                colaObj.stop();
                d3.select(this).classed("dragging", true);
            }

            function dragged(d) {
                d.px += d3.event.dx;
                d.py += d3.event.dy;
                d.x = d3.event.x;
                d.y = d3.event.y;
                d3.select(this).attr("transform", function(d) {
                    return "translate(" + (d3.event.x - d.width / 2) + "," + (d3.event.y - d.height / 2) + ")";
                });
                tick();
            }

            function dragended(d) {
                d.fixed = true;
                tick();
                colaObj.resume();
                d3.select(this).classed("dragging", false);
            }

            var connectArray = [];

            function clickNode(d) {
                //Connect Two Tasks
                

                if (window.event.ctrlKey === true) {
                    connectArray.push(d.id);
                }
                if (window.event.ctrlKey === true && connectArray.length === 2 && connectArray[0] != connectArray[1]) {
                    var cA = {
                        source: connectArray[0],
                        target: connectArray[1],
                        weight: 1
                    }
                    TopicServices.link(cA);
                    connectArray = [];

                }
            }

            function animateNode(bool,d){
                if(bool===true){
                    //d3.select(d).attr("class","selected");
                     d3.select(d.parentNode).attr("class","selected");

                }
                else{
                     d3.select(d.parentNode).attr("class",null);
                    //console.log(d);

                }

                
            }



            $http.get('/api/topics').success(function(nodes) {
                $http.get('/api/connections').success(function(con) {
                    updateInfo(nodes, con);
                })
            });


            socket.getUpdate('topic', function(obj) {
                hash_lookup[obj.id] = obj;
                nodes.push(obj);
                update();
            })


            socket.getUpdate('connection', function(obj) {
                obj.source = hash_lookup[obj.source];
                obj.target = hash_lookup[obj.target];
                links.push(obj);
                update();
            })



            function updateInfo(nObj, nLinks) {


                nObj.forEach(function(d, i) {
                    hash_lookup[d.id] = d;
                    if (d.x) {
                        //d.fixed = true;

                    }
                    nodes.push(d);
                });


                nLinks.forEach(function(d) {
                    links.push(d)
                });

                links.forEach(function(d, i) {
                    d.value = 1;
                    d.source = hash_lookup[d.source];
                    d.target = hash_lookup[d.target];
                });



                update();
            }




            colaObj.on("tick", tick);

                var link = vis.selectAll(".link")
                var label = vis.selectAll(".label")
                var node = vis.selectAll(".node");


            function update() {




                link = link.data(links);
                link.enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) {
                        return Math.sqrt(d.value);
                    });

                node = node.data(nodes);

                var n = node.enter().append("g")
                    .attr("height", function(d) {
                        return d.height + (d.height / 8) * 2;
                    })
                    .attr("width", function(d) {
                        return 150;
                    })
                    .attr("x", function(d) {
                        return d.x || 0
                    }).attr("y", 0)
                    .call(drag);


                // Create Circles + Add mouse functionality



                label = label.data(nodes);
                label.enter().append("text")
                    .attr("class", "label")
                    .text(function(d) {
                        return d.name;
                    })
                    .call(colaObj.drag);



                    var radius = 85,
                    angle = (2 * Math.PI / 360) * 270,
                    step = (2 * Math.PI) / 360;

                //Change this to have last updates by user
                
                for (var i = 0; i < 6; i++) {
                    //console.log(nodeExtra[0][i].__data__);
                    n.append("circle")
                        .on("click", function(d) {
                            
                        })
                        .attr("class", "node")
                        .attr("width", function(d) {
                            return d.width;
                        })
                        .attr("height", function(d) {
                            return d.height;
                        })
                        .attr("cy", function(d) {
                            return Math.round(d.height / 2 + d.width / 1.95 * Math.sin(angle) - d.height / 2);
                        })
                        .attr("cx", function(d) {
                            return Math.round(d.width / 2 + d.width / 1.95 * Math.cos(angle) - d.width / 2);
                        })
                        .attr("r", function(d) {
                            return d.width / 8;
                        })
                        .style("fill", function(d) {
                            return color(1);
                        });
                    angle += step * 30;
                };

                n.append("circle")
                    .on("click", function(d) {
                        clickNode(d);
                    })
                    .on("dblclick", function(d) {
                        colaObj.stop();
                        $('topic-view').addClass('slideOut');
                        $timeout(function(){
                            $state.go('topic',d);
                        },200)
                        
                    })
                    .on("contextmenu", function(d, index) {
                        //handle right click
                        //stop showing browser menu
                        d.fixed = !d.fixed
                        d3.event.preventDefault();
                    })
                    .on("mousedown", function(d) {
                        nodeMouseDown = true;
                    })
                    .on("mouseup", function(d) {
                        nodeMouseDown = false;
                    })
                    .on('mouseover',function(d){
                        animateNode(true,this);
                    })
                    .on('mouseout',function(d){
                        animateNode(false,this);
                    })
                    .attr("class", "node")
                    .attr("width", function(d) {
                        return d.width / 1.5;
                    })
                    .attr("height", function(d) {
                        return d.height / 1.5;
                    })
                    .attr("r", function(d) {
                        return d.radius / 1.5;
                    })
                    .style("fill", function(d) {
                        return color(1);
                    });


                
                colaObj.start();



            };



            var timeoutOff = false;

            function timeOutSave() {
                if (timeoutOff === false) {
                    timeoutOff = true;
                    $timeout(function() {
                        if (nodes.length > 0) {
                            TopicServices.batch(nodes);
                            timeoutOff = false;
                        }
                    }, 60000);
                }
            };

            function tick() {


                timeOutSave();



                link.attr("x1", function(d) {
                        return d.source.x - d.source.width / 2;
                    })
                    .attr("y1", function(d) {
                        return d.source.y - d.source.height / 2;
                    })
                    .attr("x2", function(d) {
                        return d.target.x - d.target.width / 2;
                    })
                    .attr("y2", function(d) {
                        return d.target.y - d.target.height / 2;
                    });



                label.attr("transform", function(d) {
                    var h = this.getBBox().height;

                    return "translate(" + d.x + "," + (d.y + h / 4) + ")";
                })

                node.attr("transform", function(d) {
                    return "translate(" + (d.x - d.width / 2) + "," + (d.y - d.height / 2) + ")";
                });


            }

        }
    };
});
