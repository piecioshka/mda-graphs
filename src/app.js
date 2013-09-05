define([
    'zepto',
    'underscore',
    'events'
], function ($, _, Events) {
    'use strict';

    function getLayerX(event) {
        var layerX = event.layerX;
        if (_.isFunction(event.eventObject)) {
            layerX = event.eventObject().layerX;
        }
        return layerX;
    }

    function getLayerY(event) {
        var layerY = event.layerY;
        if (_.isFunction(event.eventObject)) {
            layerY = event.eventObject().layerY;
        }
        return layerY;
    }
    
    var App = {
        MATRIX: [],

        AREA_WIDTH: 400,
        AREA_HEIGHT: 200,
    
        VERTEX_RADIUS: 10,

        vertices: [],

        canvas: null,
        ctx: null,

        isDrag: false,
        movableVertex: null,

        initialize: function () {

            this.validate();
            this.render();
            this.buildVertices();
            this.renderPaths();
            this.renderVertices();

            this.bindDragAndDrop();
        },
        bindDragAndDrop: function () {
            var self = this;
            var canvas = this.canvas.get(0);

            function startAction(e) {
                // Events.log('mousedown', e);
                self.movableVertex = self._getNearVertex(getLayerX(e), getLayerY(e));
                if (self.movableVertex) {
                    self.isDrag = true;
                }
            }
            function stopAction() {
                // Events.log('mouseup', e);
                self.isDrag = false;
            }
            function moveAction(e) {
                if (self.isDrag === true) {
                    // Events.log('mousedown', e);
                    self.movableVertex.x = getLayerX(e);
                    self.movableVertex.y = getLayerY(e);

                    self.clearViewPort();
                    self.renderPaths();
                    self.renderVertices();
                }
            }

            _.each([
                "mousedown", "touchstart", "dragstart"
            ], function (event) {
                Events.bind(canvas, event, startAction);
            });

            Events.bind(canvas, 'mousemove', moveAction);

            _.each([
                "mouseup", "touchend", "touchcancel",
                "touchleave", "touchmove", "tap",
                "dbltap", "dragmove", "dragend"
            ], function (event) {
                Events.bind(canvas, event, stopAction);
            });
        },
        _getNearVertex: function (x, y) {
            var radius = this.VERTEX_RADIUS;
            var index = -1;
            _.each(this.vertices, function (vertex, i) {
                var left = vertex.x - radius;
                var right = vertex.x + radius;
                var top = vertex.y - radius;
                var bottom = vertex.y + radius;

                if (x > left && x < right && y > top && y < bottom) {
                    index = i;
                }
            });
            return this.vertices[index];
        },
        validate: function () {
            var len = _.first(this.MATRIX).length;
            _.each(this.MATRIX, function (row, i) {
                if (row.length !== len) {
                    throw new Error("row nr. " + i + " has incosist items");
                }
            });
        },
        render: function () {
            this.canvas = $('<canvas>').attr({
                width: this.AREA_WIDTH,
                height: this.AREA_HEIGHT
            });
            var app = $("#app");
            app.css({
                'width': this.AREA_WIDTH,
                'height': this.AREA_HEIGHT
            }).html(this.canvas);
            this.ctx = this.canvas.get(0).getContext('2d');
        },
        clearViewPort: function () {
            this.ctx.clearRect(0, 0, this.AREA_WIDTH, this.AREA_HEIGHT);
        },
        buildVertices: function () {
            var self = this;
            _(this.MATRIX[0].length).times(function (i) {
                self.vertices.push({
                    index: i,
                    x: _.random(self.VERTEX_RADIUS, self.AREA_WIDTH - self.VERTEX_RADIUS),
                    y: _.random(self.VERTEX_RADIUS, self.AREA_HEIGHT - self.VERTEX_RADIUS)
                });
            });
        },
        renderVertices: function () {
            var self = this;
            _.each(this.vertices, function (vertex) {
                self._renderVertex(vertex);
            });
        },
        _renderVertex: function (vertex) {
            this.ctx.beginPath();
            this.ctx.arc(vertex.x, vertex.y, this.VERTEX_RADIUS, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#3a3a3a';
            this.ctx.fill();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '14px san-serif';
            this.ctx.fillText(String(vertex.index + 1), vertex.x - this.VERTEX_RADIUS/4, vertex.y + this.VERTEX_RADIUS/2);
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = '#bebebe';
            this.ctx.stroke();
        },
        renderPaths: function () {
            var self = this;
            _.each(this.MATRIX, function (row) {
                var source = self.vertices[_.indexOf(row, -1)];
                var target = self.vertices[_.indexOf(row, 1)];
                self._renderPath(source, target);
            });
        },
        _renderPath: function (source, target) {
            this.ctx.beginPath();
            this.ctx.moveTo(source.x, source.y);
            this.ctx.lineTo(target.x, target.y);
            this.ctx.stroke();
        }
    };
    return App;
});