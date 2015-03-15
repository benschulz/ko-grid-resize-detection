'use strict';

define(['module', 'onefold-dom', 'ko-grid'], function (module, dom, koGrid) {
    var extensionId = module.id.indexOf('/') < 0 ? module.id : module.id.substring(0, module.id.indexOf('/'));

    var requestAnimationFrame = window.requestAnimationFrame.bind(window),
        cancelAnimationFrame = window.cancelAnimationFrame.bind(window);

    koGrid.defineExtension(extensionId, {
        Constructor: function ResizeDetectionExtension(bindingValue, config, grid) {
            var animationFrameRequest;
            var queueLayoutRecalculation = () => {
                if (!animationFrameRequest)
                    animationFrameRequest = requestAnimationFrame(() => {
                        animationFrameRequest = null;
                        grid.layout.recalculate();
                    });
            };

            var $ = window['$'];
            var $resizables = $ ? $(dom.element.closest(grid.rootElement, '.ui-resizable')) : {'on': () => {}, 'off': () => {}};

            window.addEventListener('resize', queueLayoutRecalculation);
            $resizables['on']('resize resizestop', queueLayoutRecalculation);

            this.dispose = function () {
                window.removeEventListener('resize', queueLayoutRecalculation);
                $resizables['off']('resize resizestop', queueLayoutRecalculation);
            };
        }
    });

    return koGrid.declareExtensionAlias('resizeDetection', extensionId);
});
