if (window.getSelection && document.createRange) {
    setSelectionByCharacterOffsets = function(containerEl, start, end) {
        var charIndex = 0,
            range = document.createRange();
                    range.setStart(containerEl, 0);
                    range.collapse(true);
                    var nodeStack = [containerEl],
                        node, foundStart = false,
                        stop = false;
            
                    while (!stop && (node = nodeStack.pop())) {
                        if (node.nodeType == 3) {
                            var nextCharIndex = charIndex + node.length;
                            if (!foundStart && start >= charIndex && start <= nextCharIndex) {
                                range.setStart(node, start - charIndex);
                                foundStart = true;
                            }
                            if (foundStart && end >= charIndex && end <= nextCharIndex) {
                                range.setEnd(node, end - charIndex);
                                stop = true;
                            }
                            charIndex = nextCharIndex;
                        } else {
                            var i = node.childNodes.length;
                            while (i--) {
                                nodeStack.push(node.childNodes[i]);
                            }
                        }
            
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);}
    }
} else if (document.selection) {
    setSelectionByCharacterOffsets = function(containerEl, start, end) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(containerEl);
        textRange.collapse(true);
        textRange.moveEnd("character", end);
        textRange.moveStart("character", start);
        textRange.select();
    };
}
var setCaret = function(element, index) {
    setSelectionByCharacterOffsets(element, index, index);
};

function cursorParentIndex(element) {
    var caretOffset = 0;
   // var doc = element.ownerDocument || element.document;
    //var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof window.getSelection != "undefined") {
        var range = window.getSelection().getRangeAt(0);
        var selected = range.toString().length;
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        if (selected) { caretOffset = preCaretRange.toString().length - selected;
        } else {
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;

}

function cursorIndex() {

    return window.getSelection().getRangeAt(0).startOffset;
}


// splits text into array of lines
(function($) {
    $.fn.lines = function() {
        var words = this.text().split(" "); //split text into each word
        var lines = [];

        var hiddenElement = this.clone(); //copies font settings and width
        hiddenElement.empty(); //clear text
        hiddenElement.css("visibility", "hidden");
        hiddenElement.css("width", this.width()); //so width can be measured

        jQuery('body').append(hiddenElement); // height doesn't exist until inserted into document

        hiddenElement.text('i'); //add character to get height
        var height = hiddenElement.height();
        hiddenElement.empty();

        var startIndex = -1; // quick fix for now - offset by one to get the line indexes working
        jQuery.each(words, function() {
            var lineText = hiddenElement.text(); // get text before new word appended
            hiddenElement.text(lineText + " " + this);
            if (hiddenElement.height() > height) { // if new line
                lines.push({
                    text: lineText,
                    startIndex: startIndex,
                    endIndex: (lineText.length + startIndex)
                }); // push lineText not hiddenElement.text() other wise each line will have 1 word too many
                startIndex = startIndex + lineText.length + 1;
                hiddenElement.text(this); //first word of the next line
            }
        });
        lines.push({
            text: hiddenElement.text(),
            startIndex: startIndex,
            endIndex: (hiddenElement.text().length + startIndex)
        }); // push last line
        hiddenElement.remove();
        lines[0].startIndex = 0; //quick fix for now - adjust first line index
        return lines;
    }
})(jQuery);

(function($) { // to save a bit of typing
    $.fn.lastLine = function() {
        return this.lines()[this.lines().length - 1];
    }
})(jQuery);

function findLineViaCaret(textElement, caretIndex) {
    jQuery.each(textElement.lines(), function() {
        if (this.startIndex <= caretIndex && this.endIndex >= caretIndex) {
            r = this;
            return false; // exits loop
        }
    });
    return r;
}

function distanceToCaret(textElement, caretIndex) {

    var line = findLineViaCaret(textElement, caretIndex);
    if (line.startIndex == 0) {
        // +1 needed for substring to be correct but only first line?
        var relativeIndex = caretIndex - line.startIndex + 1;
    } else {
        var relativeIndex = caretIndex - line.startIndex;
    }
    var textToCaret = line.text.substring(0, relativeIndex);

    var hiddenElement = textElement.clone(); //copies font settings and width
    hiddenElement.empty(); //clear text
    hiddenElement.css("visibility", "hidden");
    hiddenElement.css("width", "auto"); //so width can be measured
    hiddenElement.css("display", "inline-block"); //so width can be measured

    jQuery('body').append(hiddenElement); // doesn't exist until inserted into document

    hiddenElement.text(textToCaret); //add to get width
    var width = hiddenElement.width();
    hiddenElement.remove();

    return width;
}

function getCaretViaWidth(textElement, lineNo, width) {
    var line = textElement.lines()[lineNo - 1];

    var lineCharacters = line.text.replace(/^\s+|\s+$/g, '').split("");

    var hiddenElement = textElement.clone(); //copies font settings and width
    hiddenElement.empty(); //clear text
    hiddenElement.css("visibility", "hidden");
    hiddenElement.css("width", "auto"); //so width can be measured
    hiddenElement.css("display", "inline-block"); //so width can be measured
    jQuery('body').append(hiddenElement); // doesn't exist until inserted into document

    if (width == 0) { //if width is 0 index is at start
        var caretIndex = line.startIndex;
    } else { // else loop through each character until width is reached
        hiddenElement.empty();
        jQuery.each(lineCharacters, function() {
            var text = hiddenElement.text();
            var prevWidth = hiddenElement.width();
            hiddenElement.text(text + this);
            var elWidth = hiddenElement.width();
            caretIndex = hiddenElement.text().length + line.startIndex;
            if (hiddenElement.width() > width) {
                // check whether character after width or before width is closest
                if (Math.abs(width - prevWidth) < Math.abs(width - elWidth)) {
                    caretIndex = caretIndex - 1; // move index back one if previous is closes
                }
                return false;
            }
        });
    }
    hiddenElement.remove();
    return caretIndex;
}


/* jquery.chromeinsertfix
-- version 0.4.2
-- copyright 2014 UndeadBane*2014
-- licensed under the MIT
--
-- https://github.com/UndeadBaneGitHub/jquery.chromeinsertfix
--
*/
(function ($) {
    if (typeof ($.fn.chromeinsertfix) !== "function") {
        $.fn.chromeinsertfix = function (stringToReplace, replaceWith) {
            this.on("DOMNodeInserted", $.proxy(function (e) {
                if (e.target.parentNode.getAttribute("contenteditable") === "true") {
                    var newTextNode = document.createTextNode("");
                    function antiChrome(node) {
                        if (node.nodeType == 3) {
                            newTextNode.nodeValue += node.nodeValue.replace(stringToReplace, replaceWith);
                        }
                        else if (node.nodeType == 1 && node.childNodes) {
                            for (var i = 0; i < node.childNodes.length; ++i) {
                                antiChrome(node.childNodes[i]);
                            }
                        }
                    }
                    antiChrome(e.target);
                    e.target.parentNode.replaceChild(newTextNode, e.target);
                }
            }, this));
        }
    }
})(jQuery);