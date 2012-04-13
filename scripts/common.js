/**
 * @author piecioshka
 * @date 12.04.12 23:12
 */
AREA_WIDTH = 400;
AREA_HEIGHT = 200;

AREA_MARGIN_TOP = 20;
AREA_MARGIN_LEFT = 20;

VERTEX_WIDTH = 20;
VERTEX_HEIGHT = 20;

COLOR_GREEN = 'rgb(156, 255, 40)';
COLOR_BLACK = 'rgb(0, 0, 0)';
COLOR_WHITE = 'rgb(255, 255, 255)';

if (typeof Function.prototype.bind !== "function") {
    Function.prototype.bind = function (that) {
        "use strict";
        var method = this,
            slice = Array.prototype.slice,
            args = slice.apply(arguments, [1]);
        return function () {
            return method.apply(that, args.concat(slice.apply(arguments, [0])));
        };
    };
}

if (typeof Object.prototype.compare !== "function") {
    Object.prototype.compare = function (obj) {
        var result = true;
        for(var o in obj) {
            if (this[o] !== obj[o]) {
                result = false;
            }
        }
        return result;
    };
}