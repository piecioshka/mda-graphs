(function (global) {
    "use strict";

    global.AREA_WIDTH = 400;
    global.AREA_HEIGHT = 200;

    global.AREA_MARGIN_TOP = 20;
    global.AREA_MARGIN_LEFT = 20;

    global.VERTEX_WIDTH = 20;
    global.VERTEX_HEIGHT = 20;

    global.COLOR_GREEN = 'rgb(156, 255, 40)';
    global.COLOR_BLACK = 'rgb(0, 0, 0)';
    global.COLOR_WHITE = 'rgb(255, 255, 255)';

    /** @namespace */
    var graphs = {
        init: function () {
            var area = new graphs.Area(),

                p1 = area.add_vertex(),
                p2 = area.add_vertex();

            area.add_path(p1, p2);

            area.add_vertex();
            area.add_vertex();
            area.add_vertex();
            area.add_vertex();
        }
    };

    // public API
    global.graphs = graphs;

    // run after content loading
    window.addEventListener("load", function () {
        graphs.init()
    });

}(this));