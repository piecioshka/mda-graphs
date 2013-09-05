require.config({
    paths: {
        'zepto': 'lib/zepto.min',
        'underscore': 'lib/underscore.min',
        'events': 'lib/events.min'
    },
    shim: {
        'zepto': {
            'exports': '$'
        },
        'underscore': {
            'exports': '_'
        },
        'events': {
            'exports': 'Events'
        }
    }
});

require([
    'zepto',
    'app'
],function ($, App) {
    'use strict';

    function bootstrap(data) {
        App.MATRIX = data;
        App.initialize();
    }

    $.getJSON('config/matrix.json', bootstrap);

});
