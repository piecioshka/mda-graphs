/**
 * @author piecioshka
 * @date 12.04.12 22:15
 */
(function (global) {
    "use strict";
    /** @namespace */
    var graphs = {
        init: function () {
            var area = new graphs.Area(),

                p1 = area.add_vertex(),
                p2 = area.add_vertex(),
                p3 = area.add_vertex();

            area.add_path(p1, p2);
        }
    };
    global.graphs = graphs;

    window.addEventListener("load", function () {
        graphs.init()
    });
}(this));