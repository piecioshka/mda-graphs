/**
 * @author piecioshka
 * @date 12.04.12 22:15
 */
(function (global) {
    "use strict";
    /** @namespace */
    var graphs = {
        area: null,
        init: function () {
            console.log("@graphs.init()");
            this.build();
        },
        build: function () {
            console.log("@graphs.build()");
            this.area = new graphs.Area();
            var p1 = this.area.add_vertex();
            var p2 = this.area.add_vertex();
            var p3 = this.area.add_vertex();

            this.area.add_path(p1, p2);
        }
    };
    global.graphs = graphs;

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

    Object.prototype.compare = function (obj) {
        var result = true;
        for(var o in obj) {
            if (this[o] !== obj[o]) {
                result = false;
            }
        }
        return result;
    };

    Math.modulo = function (number) {
        return number < 0 ? number * (-1) : number;
    };

    window.addEventListener("load", function () {
        graphs.init()
    });
}(this));