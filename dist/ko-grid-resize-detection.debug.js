/**
 * @license Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
;(function(factory) {
    if (typeof define === 'function' && define['amd'])
        define(['ko-grid', 'ko-data-source', 'ko-indexed-repeat', 'knockout'], factory);
    else
        window['ko-grid-resize-detection'] = factory(window.ko.bindingHandlers['grid']);
} (function(ko_grid) {
/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
var onefold_dom, ko_grid_resize_detection_resize_detection, ko_grid_resize_detection;
onefold_dom = function () {
  var onefold_dom_internal, onefold_dom;
  onefold_dom_internal = function () {
    function strictlyContains(container, node) {
      return !!(container.compareDocumentPosition(node) & 16);
    }
    function determineDepth(root, node) {
      var depth = 0;
      while (node) {
        if (node === root)
          return depth;
        node = node.parentNode;
        ++depth;
      }
      throw new Error('The given node is not part of the subtree.');
    }
    var Element = window.Element;
    var matches = Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.matches;
    function closest(element, selector) {
      do {
        if (matches.call(element, selector))
          return element;
        element = element.parentElement;
      } while (element);
      return null;
    }
    return {
      determineDepth: determineDepth,
      isOrContains: function (container, node) {
        return container === node || strictlyContains(container, node);
      },
      strictlyContains: strictlyContains,
      element: {
        closest: closest,
        matches: function (element, selector) {
          return matches.call(element, selector);
        }
      }
    };
  }();
  onefold_dom = function (main) {
    return main;
  }(onefold_dom_internal);
  return onefold_dom;
}();

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
}));