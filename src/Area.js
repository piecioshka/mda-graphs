(function (global) {
    "use strict";

    function change_cursor_to_hand() {
        var canvas = document.getElementsByTagName("canvas")[0];
        canvas.style.cursor = "pointer";
    }

    function restore_cursor() {
        var canvas = document.getElementsByTagName("canvas")[0];
        canvas.style.cursor = "default";
    }

    /**
     * @constructor
     */
    function Area() {
        this.canvas = null;
        this.context = null;
        this.is_selected = false;
        this.vertex_coords = [];
        this.edge_points = [];

        this.init();
        this.bind_events();
    }

    Area.prototype.init = function () {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "area";
        this.canvas.width = AREA_WIDTH;
        this.canvas.height = AREA_HEIGHT;
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    };

    Area.prototype._get_center_cords_of_point = function (cords) {
        return {
            x: cords.x + VERTEX_WIDTH / 2,
            y: cords.y + VERTEX_HEIGHT / 2
        };
    };

    Area.prototype._clear = function () {
        this.context.clearRect(0, 0, AREA_WIDTH, AREA_HEIGHT);
        var w = this.canvas.width;
        this.canvas.width = 1;
        this.canvas.width = w;
    };
    /******************** EDGE ********************/
    Area.prototype.paint_all_edges = function () {
        this.edge_points.forEach(function (points) {
            this._paint_edge(points[0], points[1]);
        }.bind(this));
    };

    Area.prototype.add_path = function (p1, p2) {
        p1 = this._get_center_cords_of_point(p1);
        p2 = this._get_center_cords_of_point(p2);
        this._paint_edge(p1, p2);
        this.edge_points.push([p1, p2]);
    };

    Area.prototype._paint_edge = function (p1, p2) {
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.stroke();
    };

    Area.prototype._replace_all_edges_point = function (point, cords) {
        var self = this;
        this.edge_points.forEach(function (edge_point, iterator) {
            edge_point.forEach(function (edpo, number) {
                var orig = edpo;
                var copy = self._get_center_cords_of_point({ x: point[0], y: point[1]});
                if (orig.compare(copy)) {
                    self.edge_points[iterator][number] = self._get_center_cords_of_point(cords);
                }
            });
        });
    };

    /******************** VERTEX ********************/

    Area.prototype.paint_all_vertex = function () {
        this._clear();
        this.vertex_coords.forEach(function (cords) {
            this._paint_vertex({ x: cords[0], y: cords[1] });
        }.bind(this));
    };

    Area.prototype.add_vertex = function () {
        var left = parseInt((Math.random() * (AREA_WIDTH - VERTEX_WIDTH)).toFixed(0), 10);
        var top = parseInt((Math.random() * (AREA_HEIGHT - VERTEX_HEIGHT)).toFixed(0), 10);
        this.vertex_coords.push([left, top]);
        var cords = { x: left, y: top };
        this._paint_vertex(cords);
        this.paint_all_numbers();
        return cords;
    };

    Area.prototype._paint_vertex = function (cords) {
        this.context.rect(cords.x, cords.y, VERTEX_WIDTH, VERTEX_HEIGHT);
        this.context.fillStyle = COLOR_GREEN;
        this.context.fill();
        this.context.stroke();
    };

    Area.prototype._get_vertex = function (cords) {
        var result = null;
        var id = null;
        this.vertex_coords.forEach(function (vertex, iterator) {
            var x = vertex[0] - cords.x;
            var y = vertex[1] - cords.y;
            var left = Math.abs(x) <= VERTEX_WIDTH;
            var top = Math.abs(y) <= VERTEX_HEIGHT;
            if (left && top) {
                result = vertex;
                id = iterator;
            }
        });
        return {
            id: id,
            cords: result
        };
    };

    /******************** NUMBERS ********************/

    Area.prototype.paint_all_numbers = function () {
        var vertex_number = 1;
        var self = this;
        this.vertex_coords.forEach(function (cords) {
            self.context.fillStyle = COLOR_BLACK;
            self.context.font = 'bold 15px sans-serif';
            self.context.fillText(vertex_number, cords[0] + 6, cords[1] + 15);
            vertex_number++;
        });
    };

    /******************** EVENTS ********************/

    Area.prototype._onmousedown = function () {
        this.is_selected = true;

        change_cursor_to_hand();
    };

    Area.prototype._onmousemove = function (evt) {
        if (this.is_selected) {
            var cords = {
                x: evt.clientX - AREA_MARGIN_LEFT,
                y: evt.clientY - AREA_MARGIN_TOP
            };
            // check collision to wall
            if (/* left wall */ cords.x < 0 ||
                /* top wall */ cords.y < 0 ||
                /* right wall */ cords.x > (AREA_WIDTH - VERTEX_WIDTH) ||
                /* bottom wall */ cords.y > (AREA_HEIGHT - VERTEX_HEIGHT)) {
                return false;
            }
            var vertex = this._get_vertex(cords);
            if (vertex.id !== null) {
                this._replace_all_edges_point(this.vertex_coords[vertex.id], cords);
                this.vertex_coords[vertex.id] = [cords.x, cords.y];
                this.paint_all_vertex();
                this.paint_all_numbers();
                this.paint_all_edges();
            }
        }
    };

    Area.prototype._onmouseup = function () {
        if (this.is_selected) {
            this.is_selected = false;
            restore_cursor();
        }
    };

    Area.prototype.bind_events = function () {
        this.canvas.addEventListener('mousedown', this._onmousedown.bind(this), false);
        this.canvas.addEventListener('mousemove', this._onmousemove.bind(this), false);
        this.canvas.addEventListener('mouseup', this._onmouseup.bind(this), false);
    };

    // public API
    global.graphs.Area = Area;

}(this));