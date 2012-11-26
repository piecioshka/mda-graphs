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
            if (obj.hasOwnProperty(o)) {
                if (this[o] !== obj[o]) {
                    result = false;
                }
            }
        }
        return result;
    };
}