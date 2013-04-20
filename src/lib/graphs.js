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

    function check_matrix() {
      var len = _.first(MATRIX).length;
      _.each(MATRIX, function (row, i) {
        if (row.length !== len) {
          throw new Error("row nr. " + i + " has incosist items");
        }
      });
    }

    function create_all_vertex() {
      var vertex = [];
      var area = new graphs.Area();
      var number = _.first(MATRIX).length;

      _(number).times(function () {
        vertex.push(area.create_vertex());
      });
      global.AA = area;
      return area;
    }

    function get_1_in_column(num_of_column) {
      var inst = [];
      _.each(MATRIX, function (row, i) {
        _.each(row, function (item, j) {
          if (item === 1 && j === num_of_column) {
            inst.push(i);
          }
        });
      });
      return inst;
    }

    function create_all_paths(area) {
      var list = area.vertex_coords;
      console.log(list);
      area.add_path(list[0], list[2]);

      /*
      _.each(MATRIX, function (row, i) {
        // i - numerek wiersza (start: 0)
        _.each(row, function (item, j) {
          // j - element w wierszu (start: 0)
          if (item === 1) {
            var all = get_1_in_column(j);
            var g = _.without(all, i);
            _.each(g, function (elm, k) {
              console.log(i+1, elm+1);
              area.add_path( list[i], list[elm]);
            });
          }
        });
      });
      */
    }

    /** @namespace */
    var graphs = {
        init: function () {
            check_matrix(MATRIX);
            var area = create_all_vertex();
            create_all_paths(area);
        }
    };

    // public API
    global.graphs = graphs;

    // run after content loading
    window.addEventListener("load", function () {
        graphs.init()
    });

}(this));
