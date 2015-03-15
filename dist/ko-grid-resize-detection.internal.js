/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define(['onefold-dom', 'indexed-list', 'onefold-lists', 'onefold-js', 'ko-grid', 'ko-data-source', 'ko-indexed-repeat', 'knockout'],    function(onefold_dom, indexed_list, onefold_lists, onefold_js, ko_grid, ko_data_source, ko_indexed_repeat, knockout) {
var ko_grid_resize_detection_resize_detection, ko_grid_resize_detection;

ko_grid_resize_detection_resize_detection = function (module, dom, koGrid) {
  var extensionId = 'ko-grid-resize-detection'.indexOf('/') < 0 ? 'ko-grid-resize-detection' : 'ko-grid-resize-detection'.substring(0, 'ko-grid-resize-detection'.indexOf('/'));
  var requestAnimationFrame = window.requestAnimationFrame.bind(window), cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  koGrid.defineExtension(extensionId, {
    Constructor: function ResizeDetectionExtension(bindingValue, config, grid) {
      var animationFrameRequest;
      var queueLayoutRecalculation = function () {
        if (!animationFrameRequest)
          animationFrameRequest = requestAnimationFrame(function () {
            animationFrameRequest = null;
            grid.layout.recalculate();
          });
      };
      var $ = window['$'];
      var $resizables = $ ? $(dom.element.closest(grid.rootElement, '.ui-resizable')) : {
        'on': function () {
        },
        'off': function () {
        }
      };
      window.addEventListener('resize', queueLayoutRecalculation);
      $resizables['on']('resize resizestop', queueLayoutRecalculation);
      this.dispose = function () {
        window.removeEventListener('resize', queueLayoutRecalculation);
        $resizables['off']('resize resizestop', queueLayoutRecalculation);
      };
    }
  });
  return koGrid.declareExtensionAlias('resizeDetection', extensionId);
}({}, onefold_dom, ko_grid);
ko_grid_resize_detection = function (main) {
  return main;
}(ko_grid_resize_detection_resize_detection);return ko_grid_resize_detection;
});