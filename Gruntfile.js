'use strict';

module.exports = function (grunt) {
    require('grunt-commons')(grunt, {
        name: 'ko-grid-resize-detection',
        main: 'resize-detection',
        internalMain: 'resize-detection',

        shims: {
            'ko-grid': 'window.ko.bindingHandlers[\'grid\']'
        }
    }).initialize({});
};
