"use strict";
var textEditor;
(function (textEditor) {
    function getCaretPosition(editableDiv) {
        var caretPos = 0, sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode == editableDiv) {
                    caretPos = range.endOffset;
                }
            }
        }
        return caretPos;
    }
    textEditor.getCaretPosition = getCaretPosition;
    function getTextNodesIn(node) {
        var textNodes = [];
        if (node.nodeType == 3) {
            textNodes.push(node);
        }
        else {
            var children = node.childNodes;
            for (var i = 0, len = children.length; i < len; ++i) {
                textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
            }
        }
        return textNodes;
    }
    textEditor.getTextNodesIn = getTextNodesIn;
    function setSelectionRange(el, start, end) {
        if (document.createRange && window.getSelection) {
            var range = document.createRange();
            range.selectNodeContents(el);
            var textNodes = getTextNodesIn(el);
            var foundStart = false;
            var charCount = 0, endCharCount;
            for (var i = 0, textNode; (textNode = textNodes[i++]);) {
                // @ts-ignore
                endCharCount = charCount + textNode.length;
                if (!foundStart && start >= charCount && (start < endCharCount || (start == endCharCount && i <= textNodes.length))) {
                    range.setStart(textNode, start - charCount);
                    foundStart = true;
                }
                if (foundStart && end <= endCharCount) {
                    range.setEnd(textNode, end - charCount);
                    break;
                }
                charCount = endCharCount;
            }
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    textEditor.setSelectionRange = setSelectionRange;
})(textEditor || (textEditor = {}));
