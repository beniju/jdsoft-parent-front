/**
 * Esta clase contiene un conjunto de directivas de para manejo de eventos
 * @class
 * @name master.directive.focused
 * @author <a href="mailto:ggimenez@konecta.com.py">Gabriel Alberto Giménez</a>
 */
angular.module('events', [])
    /*
     * Se define la directiva
     */

.directive('ngEnter', function() {
        return function(scope, element, attr) {
            return element.bind('keydown keypress', function(e) {
                if (e.which === 13) {
                    //scope.$apply(attr.ngEnter);
                    return e.preventDefault();
                }
            });
        }
    })
    .directive('focused', function() {
        var FOCUS_CLASS = "ng-focused";
        return {
            //se restringe que la directiva solo se pueda usar como Atributo
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function(evt) {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function() {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function(evt) {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function() {
                        ctrl.$focused = false;
                    });
                });
            }
        }
    })


.directive('onTab', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            return element.bind('keydown keypress', function(e) {
                if ((e.which === 9) && !e.shiftKey) {
                    return attr.onTab; //scope.$apply(attr.onTab);
                }
            });
        }
    }
})

.directive('onBlur', function() {
    return {
        //se restringe a que solo se pueda usar como Atributo
        restrict: 'A',
        priority: 1000,
        require: 'ngModel',


        //link function
        link: function postLink(scope, element, attrs, ctrl) {

            element.oldValueOnBlurDirective = null;

            element.bind('blur', function() {
                var onBlurConfig = scope.$eval(attrs.onBlur).onBlurConfig;

                if ((!onBlurConfig.validarValueChanged || element.oldValueOnBlurDirective !== element.val()) && (!onBlurConfig.validar || ctrl.$valid)) {
                    scope.$apply(onBlurConfig.controllerFunction);
                    element.oldValueOnBlurDirective = element.val();
                }
            });
        }
    };
});