require.config({
    baseUrl: './src',
    paths: {
        'microajax': 'lib/microajax.min',
        'underscore': 'lib/underscore.min',
        'events': 'lib/events.min'
    },
    shim: {
        'microajax': {
            'exports': 'microAjax'
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
    'microajax',
    'core/app'
],function (microAjax, App) {
    'use strict';

    function bootstrap(data) {
        App.MATRIX = JSON.parse(data);
        App.initialize();
    }

    microAjax('config/matrix.json', bootstrap);
});
