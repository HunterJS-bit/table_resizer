'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = tableColumnResizer = function () {

    // Keep this variable private inside this closure scope
    var dragColumn = null;
    var nextColumn = null;
    var columnOffset = null;
    var pageX = null;
    var nextWidth = null;
    var currWidth = null;

    var paddingDiff = function paddingDiff(col) {
        if (getStyleVal(col, 'box-sizing') == 'border-box') {
            return 0;
        }
        var padLeft = getStyleVal(col, 'padding-left');
        var padRight = getStyleVal(col, 'padding-right');
        return parseInt(padLeft) + parseInt(padRight);
    };

    var getStyleVal = function getStyleVal(elm, css) {
        return window.getComputedStyle(elm, null).getPropertyValue(css);
    };

    var init = function init(element) {
        var arrElements = element.querySelectorAll('tr th');

        arrElements.forEach(function (el) {
            var resizer = document.createElement('div');
            Object.assign(resizer.style, {
                position: "absolute",
                top: "0px",
                left: "0px",
                bottom: '0px',
                cursor: 'col-resize',
                width: '5px' });
            el.style.position = 'relative';
            el.appendChild(resizer);
            resizer.addEventListener('mousedown', function (e) {
                dragColumn = e.target.parentElement;
                nextColumn = dragColumn.nextElementSibling;
                columnOffset = dragColumn.offsetWidth - e.pageX;
                pageX = e.pageX;
                var padding = paddingDiff(dragColumn);
                currWidth = dragColumn.offsetWidth - padding;
                if (nextColumn) {
                    nextWidth = nextColumn.offsetWidth - padding;
                }
            });
        });

        table.addEventListener('mousemove', function (e) {
            if (dragColumn) {
                var difX = e.pageX - pageX;
                if (nextColumn) {
                    nextColumn.style.width = nextWidth - difX + 'px';
                    dragColumn.style.width = currWidth + difX + 'px';
                }
            }
        });

        table.addEventListener('mouseup', function (e) {
            dragColumn = null;
            nextColumn = null;
            columnOffset = null;
            pageX = null;
            nextWidth = null;
            currWidth = null;
        });
    };

    // Explicitly reveal public pointers to the private functions 
    // that we want to reveal publicly

    return {
        init: init
    };
}();
