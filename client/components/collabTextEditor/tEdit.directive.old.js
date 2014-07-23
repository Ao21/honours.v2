/*'use strict';

angular.module('honoursApp').directive('collaborativeTextEdit', function($http, socket, $timeout, TopicServices, $state) {
    return {
        restrict: 'E',
        controller: 'TopicsCtrl',
        templateUrl: 'components/collabTextEditor/tEdit.html',
        link: function(scope, element, attrs, ctrl) {

        }
    }
})




.directive('contenteditable', function() {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model






            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$apply(readViewText);
            });


            element.on('blur', function() {
                scope.$apply(readViewText);
            });




            // Listen for change events to enable binding
            // Specify how UI should be updated
            ngModel.$render = function() {

                //element.html(ngModel.$viewValue || '');
            };



            // No need to initialize, AngularJS will initialize the text based on ng-model attribute

            // Write data to the model
            function readViewText() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
               

                ngModel.$setViewValue(html);
                //txt.remove();
            }


        }
    };


})

.directive('ngEnter', function() {
    return function(scope, element, attrs) {

        element.bind("keydown keypress", '[contenteditable]', function(event) {
        	
            if (event.which === 13 && event.ctrlKey) {
            	var range = window.getSelection();
            	var anchorOffset = range.anchorOffset;
            	console.log(range);
				scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });



                var next = $(element).parent().next().children('div');
                if(anchorOffset!=0){
                       		next.focus();	
                }
                
                //var range = window.getSelection();
                //console.log(range);

                event.preventDefault();
            }


        });

    };
})


.directive('backspaceLast', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress",'div[contenteditable]', function(event) {
            var range = document.getSelection();
            if (event.which === 8  && event.ctrlKey ) {
            	console.log('backspace');
                var previous = $(element).parent().prev().children('div');
                console.log(previous.get(0));
                 var len = previous.get(0).textContent.length;

                scope.$apply(function() {
                    scope.$eval(attrs.backspaceLast);
                });


                var range, selection;
                if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
                {
                    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
                    range.selectNodeContents(previous[0]); //Select the entire contents of the element with the range
                    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
                    selection = window.getSelection(); //get the selection object (allows you to change selection)
                    selection.removeAllRanges(); //remove any selections already made
                    selection.addRange(range); //make the range you have just created the visible selection

                } else if (document.selection) //IE 8 and lower
                {
                    range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
                    range.moveToElementText(previous); //Select the entire contents of the element with the range
                    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
                    range.select(); //Select the range (make it the visible selection
                }



				setCaret(previous.get(0), len);


                //previous.focus();
                //placeCaretAtEnd(previous);

                event.preventDefault();

                //var range = window.getSelection();
                //console.log(range);

            }
        });
    };
});




angular.module('honoursApp').directive('keypressPg', function($timeout) {
    return function(scope, element, attrs) {
        var setSelectionByCharacterOffsets = null;
        // set cursor
        element.on('paste',function(e) {
		    e.preventDefault();
		    var contentOnBlur = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
		    contentOnBlur = contentOnBlur.replace(/(<([^>]+)>)/ig,'');
		    contentOnBlur = contentOnBlur.replace(/]?>[\s\S]?<\/div>/gi, "");
		    //contentOnBlur = html_sanitize(contentOnBlur);

		    document.execCommand('insertText', false, contentOnBlur);
		    $timeout(function(){
		    	angular.element('div[contenteditable]').children('div').on('keydown keypress',function(event){
        		      console.log(event);

        		event.stopPropagation();
        	})
		    },50)

		    
		});


        // arrow key conditions
        element.on('keydown', '[contenteditable]', function(e) {
            //if cursor on first line & up arrow key

            if (e.which == 17 && e.which == 98 ) {
            	e.preventDefault();
			}
            if (e.which == 38 && (cursorIndex() < $(this).lines()[0].text.length)) {
                e.preventDefault();
                if ($(this).parent().prev().children('div').is('div')) {
                    var prev = $(this).parent().prev().children('div');
                    var getDistanceToCaret = distanceToCaret($(this), cursorIndex());
                    var lineNumber = prev.lines().length;
                    var caretPosition = getCaretViaWidth(prev, lineNumber, getDistanceToCaret);
                    prev.focus();
                    setCaret(prev.get(0), caretPosition);
                }
                // if cursor on last line & down arrow
            } else if (e.which == 40 && cursorIndex() >= $(this).lastLine().startIndex && cursorIndex() <= ($(this).lastLine().startIndex + $(this).lastLine().text.length)) {
                e.preventDefault();
                if ($(this).parent().next().children('div').is('div')) {
                    var next = $(this).parent().next().children('div');
                    var getDistanceToCaret = distanceToCaret($(this), cursorIndex());
                    var caretPosition = getCaretViaWidth(next, 1, getDistanceToCaret);
                    next.focus();
                    setCaret(next.get(0), caretPosition);
                }
                //if start of paragraph and left arrow
            } else if (e.which == 37 && cursorIndex() == 0) {
                e.preventDefault();
                if ($(this).prev().is('div')) {
                    var prev = $(this).prev('div');
                    prev.focus();
                    setCaret(prev.get(0), prev.text().length);
                }
                // if end of paragraph and right arrow
            } else if (e.which == 39 && cursorIndex() == $(this).text().length) {
                e.preventDefault();
                if ($(this).next().is('div')) {
                    $(this).next('div').focus();
                }
            };
        });
    };
});
*/