/*'use strict';

var TestEditCtrl = function($scope, $http, socket, TopicServices) {
    var _this = this;
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.TopicServices = TopicServices;

    this.connectVisible = false;



    this.doc = [{
        pg: 'It was unclear, however, whether such an indirect call to allow the investigation into the flight to proceed would satisfy the growing chorus of critics demanding that Mr. Putin intervene directly with the pro-Russian separatists.',
        type: 'paragraph'
    }, {
        pg: 'Later on Monday, the Russian Defense Ministry said a briefing that images that purported to show a surface-to-air missile system being driven toward Russia after the downing of the plane were fake, Interfax reported. The Defense Ministry also said that an American satellite was flying over eastern Ukraine at the time of the crash, Interfax reported, and it asked Washington to release the satellite imagery.',
        type: 'paragraph'
    }, {
        pg: 'In Torez, about 40 miles east, where the bodies of Flight 17 victims were being held, the Dutch forensics specialists arrived at about 11:30 a.m. and bowed their heads for a few seconds of silence. The first wagon was opened by a woman, apparently a railroad worker, in a tight satiny black skirt, tight white shirt and high wedge heels with purple straps.',
        type: 'paragraph'
    }, {
        pg: 'After a preliminary inspection, Peter van Vliet, one of the Dutch investigators, said, “I think the storage of the bodies is of good quality.” He then turned away and walked back with his colleagues to the train, where O.S.C.E. workers said they would seal the wagons.',
        type: 'paragraph'
    }, {
        pg: 'The Ukrainian government had said it planned to base the investigation into the downing of the jet in Kharkiv, eastern Ukraine’s biggest city, which lies around 190 miles north of the crash site and is under the control of the government in Kiev.',
        type: 'paragraph'
    }, {
        pg: 'A larger team of forensic experts, including 23 from the Netherlands, two from Germany, two from the United States, and one from Britain, arrived in Kharkiv early Monday.',
        type: 'paragraph'
    }, {
        pg: '“We are here to get the bodies back to their countries and to their families. We will try our utmost to do this as quickly as possible,” Michel Oz, the group’s Dutch coordinator, said. But he added that it was still unclear whether the separatist rebels who control the crash site and the nearby railway station at Torez would allow a train loaded with corpses to leave for Kharkiv. “We have no information,” he said.',
        type: 'paragraph'
    }, {
        pg: 'Mr. Oz said the international team now assembling in Kharkiv included experts from the Federal Bureau of Investigation, a unit of the German federal police that handles the identification of disaster victims, as well as officials from Britain and Australia. Malaysia is also due to join the effort.',
        type: 'paragraph'
    }, {
        pg: 'An Australian official who declined to be identified voiced dismay that the bodies were effectively being held hostage by separatist rebels. “We have no idea what is going on and when we can get the bodies,” he said. Igor Baluta, the governor of Kharkiv, complained that the separatists were frustrating efforts to identify corpses and return them to their families.',
        type: 'paragraph'
    }, {
        pg: '“We are all ready here. We are prepared to receive the bodies but everything depends on getting an agreement” with the rebels, Mr. Baluta told reporters on Monday.',
        type: 'paragraph'
    }];

    $scope.joinLastParagraph = function(e, obj) {
        //console.log(e);
        _this.join(e, obj);
    }

    $scope.lockItem = function(e) {
        //console.log(e.currentTarget);
    }
    $scope.update = function(e) {
        _this.updateDoc();
    }

    $scope.newPg = function(e) {
        _this.split(e);
    }



}


TestEditCtrl.prototype.LockDoc = function(e) {
    //
    console.log('updated');
}


TestEditCtrl.prototype.updateDoc = function(e) {
    // console.log('updated');
}


TestEditCtrl.prototype.join = function(e) {
    var cIndex = _.findLastIndex(this.doc, {
        'pg': e.paragraphs.pg
    });

    var prevElement = this.doc[cIndex - 1].pg;
    var thisElement = this.doc[cIndex].pg;

    if (cIndex != 0) {
        if (this.doc[cIndex - 1].value != undefined) {
            prevElement = this.doc[cIndex - 1].value
        }
        if (this.doc[cIndex].value != undefined) {
            thisElement = this.doc[cIndex].value;
        }


        this.doc[cIndex - 1].pg = prevElement.trim() + thisElement.trim();
        this.doc.splice(cIndex, 1);

    }
}


TestEditCtrl.prototype.split = function(e, obj) {
    var range = window.getSelection();
    this.splitArray(e.paragraphs.pg, range, e, obj);
}


TestEditCtrl.prototype.splitArray = function(item, caret, e, obj) {

    var cIndex = _.findLastIndex(this.doc, {
        'pg': item
    });
    var current = this.doc[cIndex];

    if (cursorIndex() === 0) {
        this.doc.splice(cIndex, 0, { pg: "",});

    } else if (cursorIndex() === this.doc[cIndex].pg.length) {
        this.doc.splice(cIndex + 1, 0, {
            pg: ""
        });
    } else {
        var string = current.pg;
        if (current.value != null) {
            string = current.value;
        }
        var start = string.substring(0, caret.anchorOffset);
        var end = string.substring(caret.anchorOffset).trim();
        //start = s.clean_node(start);
        //end = s.clean_node(end);
        current.pg = start.trim();
        this.doc.splice(cIndex + 1, 0, {
            pg: end
        });

    }
}


function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

TestEditCtrl.prototype.connectTopics = function() {
    this.connectVisible = !this.connectVisible;
}


TestEditCtrl.$inject = ['$scope', '$http', 'socket', 'TopicServices'];
angular.module('honoursApp').controller('TestEditCtrl', TestEditCtrl);
*/