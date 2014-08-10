'use strict';

var DocumentCtrl = function($scope, $http, socket, TopicServices, $rootScope, Auth) {
    var _this = this;
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.TopicServices = TopicServices;
    this.$rootScope = $rootScope;
    this.Auth = Auth;

    this.connectVisible = false;

    this.originalDiff = "", this.updatedDiff = "";

    this.dmp = new diff_match_patch();

    this.hello = "Gi";


    socket.emitMessages('realtime:join', {
        userId: Auth.getCurrentUser()._id,
        docId: 0,
    });

    socket.recieveMessage('realtime:joined', function(data) {
        console.log(data);
    })


    //Lock Paragraphs Based On User Use

    socket.recieveMessage('realtime:updateLocks', function(data) {
        var getUserIndex = _.findIndex(_this.currentUsers, {
            userId: data.userId
        });
  /*      if (getUserIndex === -1) {
            _this.currentUsers.push(data)
        } else {
            _this.currentUsers.splice(getUserIndex, 1, data)
        }*/
        for (var i = _this.doc.length - 1; i >= 0; i--) {
            _this.doc[i].locked = false;
        };

        for (var i = data.currentUsers.length - 1; i >= 0; i--) {
            if (data.currentUsers[i].userId != Auth.getCurrentUser()._id) {

                $scope.$apply(function() {
                    _this.doc[data.currentUsers[i].pId].locked = true;
                    //_this.doc = "hiu";
                });
            }
        };
    });



   /* socket.recieveMessage('realtime:lockParagraph', function(data) {
        var getUserIndex = _.findIndex(_this.currentUsers, {
            userId: data.userId
        });
        if (getUserIndex === -1) {
            _this.currentUsers.push(data)
        } else {
            _this.currentUsers.splice(getUserIndex, 1, data)
        }

        for (var i = _this.currentUsers.length - 1; i >= 0; i--) {
            $scope.$apply(function() {


                _this.doc[_this.currentUsers[i].pId].locked = true;
                //_this.doc = "hiu";
            });
        };
    });


    socket.recieveMessage('realtime:unlockParagraph', function(data) {
        var getUserIndex = _.findIndex(_this.currentUsers, {
            userId: data.userId
        });
        if (getUserIndex === -1) {
            _this.currentUsers.push(data)
        } else {
            _this.currentUsers.splice(getUserIndex, 1, data)
        }

        for (var i = _this.currentUsers.length - 1; i >= 0; i--) {
            $scope.$apply(function() {
                for (var i = _this.doc.length - 1; i >= 0; i--) {
                    _this.doc[i].locked = false;
                };
                //_this.doc[_this.currentUsers[i].pId].locked=true;
                //_this.doc = "hiu";
            });
        };
    });*/







    this.currentUsers = [];


    this.doc = [{
        pg: 'It was unclear, however, whether such an indirect call to allow the investigation into the flight to proceed would satisfy the growing chorus of critics demanding that Mr. Putin intervene directly with the pro-Russian separatists.',
        type: 'paragraph',
        pgId: 0,
        locked: false

    }, {
        pg: 'Later on Monday, the Russian Defense Ministry said a briefing that images that purported to show a surface-to-air missile system being driven toward Russia after the downing of the plane were fake, Interfax reported. The Defense Ministry also said that an American satellite was flying over eastern Ukraine at the time of the crash, Interfax reported, and it asked Washington to release the satellite imagery.',
        type: 'paragraph',
        pgId: 1,
        locked: false
    }, {
        pg: 'In Torez, about 40 miles east, where the bodies of Flight 17 victims were being held, the Dutch forensics specialists arrived at about 11:30 a.m. and bowed their heads for a few seconds of silence. The first wagon was opened by a woman, apparently a railroad worker, in a tight satiny black skirt, tight white shirt and high wedge heels with purple straps.',
        type: 'paragraph',
        pgId: 2,
        locked: false
    }, {
        pg: 'After a preliminary inspection, Peter van Vliet, one of the Dutch investigators, said, “I think the storage of the bodies is of good quality.” He then turned away and walked back with his colleagues to the train, where O.S.C.E. workers said they would seal the wagons.',
        type: 'paragraph',
        pgId: 3,
        locked: false
    }, {
        pg: 'The Ukrainian government had said it planned to base the investigation into the downing of the jet in Kharkiv, eastern Ukraine’s biggest city, which lies around 190 miles north of the crash site and is under the control of the government in Kiev.',
        type: 'paragraph',
        pgId: 4,
        locked: false
    }, {
        pg: 'A larger team of forensic experts, including 23 from the Netherlands, two from Germany, two from the United States, and one from Britain, arrived in Kharkiv early Monday.',
        type: 'paragraph',
        pgId: 5,
        locked: false
    }, {
        pg: '“We are here to get the bodies back to their countries and to their families. We will try our utmost to do this as quickly as possible,” Michel Oz, the group’s Dutch coordinator, said. But he added that it was still unclear whether the separatist rebels who control the crash site and the nearby railway station at Torez would allow a train loaded with corpses to leave for Kharkiv. “We have no information,” he said.',
        type: 'paragraph',
        pgId: 6,
        locked: false
    }, {
        pg: 'Mr. Oz said the international team now assembling in Kharkiv included experts from the Federal Bureau of Investigation, a unit of the German federal police that handles the identification of disaster victims, as well as officials from Britain and Australia. Malaysia is also due to join the effort.',
        type: 'paragraph',
        pgId: 7,
        locked: false
    }, {
        pg: 'An Australian official who declined to be identified voiced dismay that the bodies were effectively being held hostage by separatist rebels. “We have no idea what is going on and when we can get the bodies,” he said. Igor Baluta, the governor of Kharkiv, complained that the separatists were frustrating efforts to identify corpses and return them to their families.',
        type: 'paragraph',
        pgId: 8,
        locked: false
    }, {
        pg: '“We are all ready here. We are prepared to receive the bodies but everything depends on getting an agreement” with the rebels, Mr. Baluta told reporters on Monday.',
        type: 'paragraph',
        pgId: 9,
        locked: false
    }, {
        pg: 'A larger team of forensic experts, including 23 from the Netherlands, two from Germany, two from the United States, and one from Britain, arrived in Kharkiv early Monday.',
        type: 'paragraph',
        pgId: 5,
        locked: false
    }, {
        pg: '“We are here to get the bodies back to their countries and to their families. We will try our utmost to do this as quickly as possible,” Michel Oz, the group’s Dutch coordinator, said. But he added that it was still unclear whether the separatist rebels who control the crash site and the nearby railway station at Torez would allow a train loaded with corpses to leave for Kharkiv. “We have no information,” he said.',
        type: 'paragraph',
        pgId: 6,
        locked: false
    }, {
        pg: 'Mr. Oz said the international team now assembling in Kharkiv included experts from the Federal Bureau of Investigation, a unit of the German federal police that handles the identification of disaster victims, as well as officials from Britain and Australia. Malaysia is also due to join the effort.',
        type: 'paragraph',
        pgId: 7,
        locked: false
    }, {
        pg: 'An Australian official who declined to be identified voiced dismay that the bodies were effectively being held hostage by separatist rebels. “We have no idea what is going on and when we can get the bodies,” he said. Igor Baluta, the governor of Kharkiv, complained that the separatists were frustrating efforts to identify corpses and return them to their families.',
        type: 'paragraph',
        pgId: 8,
        locked: false
    }, {
        pg: '“We are all ready here. We are prepared to receive the bodies but everything depends on getting an agreement” with the rebels, Mr. Baluta told reporters on Monday.',
        type: 'paragraph',
        pgId: 9,
        locked: false
    }];


    this.currentDocumentProperties = {};
    this.currentDocumentProperties.realtime = [];

    $scope.joinLastParagraph = function(currentText) {
        _this.splitArray(currentText);
        _this.updateDoc();

    }


    $scope.update = function(e) {
        _this.updateDoc();
    }


    $scope.checkIfInUse = function(e) {
        var inuse = false;
        if (!inuse) {
            e.currentTarget.contentEditable = true;
        }
    }

    $scope.lockItem = function(e) {
        socket.emitMessages('realtime:selectParagraph', {
            userId: Auth.getCurrentUser(),
            docId: 0,
            pId: e.target.attributes.in.value
        })
    }


    $scope.unlockItem = function(e) {
        socket.emitMessages('realtime:deSelectParagraph', {
            userId: Auth.getCurrentUser(),
            docId: 0,
            pId: e.target.attributes.in.value
        })
    }


    $scope.newPg = function(e) {
        _this.split(e);
    }

    $scope.computeDiff = function(updatedText, e) {
        _this.updatedDiff = JSON.stringify(e.$parent.TestEdit.doc);
        if (_this.updatedDiff != _this.originalDiff && _this.updatedDiff != "") {
            console.log('different');
            console.log(_this.updatedDiff);
            console.log(_this.originalDiff);
            _this.computeDiff(_this.originalDiff, _this.updatedDiff, e.$index)
        }
    }

    $scope.storeOriginalDiff = function(firstText, s) {
        _this.originalDiff = JSON.stringify(s.$parent.TestEdit.doc);
        _this.updatedText = "";

    }


    $scope.updateDocs = function() {
        _this.updateDoc();
    }

    $scope.joinPara = function(a, b, c, start) {
        console.log('join');
        //$scope.$apply();
        _this.doc.splice(a, b, c);
        _this.updateDoc();
    }


    socket.recieveMessage('realtime:updateDocs', function(data) {
        $scope.$apply(function() {
            _this.doc = data.docs;
            _this.$rootScope.$emit('docs', 'updated')
        })

    })



    $scope.$watch('doc', function(doc, doc2) {
        //console.log(doc);
        //console.log(doc2);
    });


}


DocumentCtrl.prototype.updateDoc = function(orig, updated, pIndex) {


    this.socket.emitMessages('realtime:updateDocs', {
        userId: this.Auth.getCurrentUser()._id,
        docId: 0,
        docs: this.doc
    });

}

DocumentCtrl.prototype.computeDiff = function(orig, updated, pIndex) {
    var d = this.dmp.diff_main(orig, updated);
    //console.log(d);
    var x = this.dmp.patch_make(d);
    var obj = {};
    obj.id = '0001';
    //obj.pIndex = pIndex;
    obj.diff = d;
    //console.log(d);
    //this.socket.emitMessages('realtime',obj)

}

DocumentCtrl.prototype.splitArray = function(currentText) {
    /*var cIndex = _.findLastIndex(this.doc, {
        'pg': currentText.trim()
    });
    var current = this.doc[cIndex];
    console.log(current);
    console.log(this);*/
    this.doc = [];


    //console.log(this.doc);



}

DocumentCtrl.$inject = ['$scope', '$http', 'socket', 'TopicServices', '$rootScope', 'Auth'];
angular.module('honoursApp').controller('DocumentCtrl', DocumentCtrl);
