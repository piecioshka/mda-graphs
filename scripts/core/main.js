/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @see https://piecioshka.github.io/mda-graphs/
 * @license The MIT License {@link https://piecioshka.mit-license.org/}
 */
require.config({
    baseUrl: './scripts',
    paths: {
        'microajax': 'vendor/microajax.min',
        'underscore': 'vendor/underscore.min',
        'events': 'vendor/events.min'
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
