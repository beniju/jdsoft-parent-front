/**
 * Esta directiva se encarga de validar una regla de negocio particular
 * @class
 * @name master.directive.validateNumber
 * @author <a href="mailto:ggimenez@konecta.com.py">Gabriel Alberto Giménez</a>
 */
//replace

/*
 * Se define la directiva
 */
angular.module('validateReglaNegocio', [])
    .directive('validateReglaNegocio', ['$q',
        function($q) {

            return {
                restrict: 'A',
                require: 'ngModel',
                priority: 500,
                link: function(scope, elem, attrs, ctrl) {
                    elem.oldValueReglaNegocioDirective = null;

                    elem.bind('blur', function() {
                        elem.oldValueReglaNegocioDirective = elem.val();
                        var result = scope.$apply(attrs.validateReglaNegocio);
                        if (!result) {
                            scope.$apply(function() {
                                ctrl.$setValidity('reglaNegocio', false);
                            });
                        } else {
                            scope.$apply(function() {
                                ctrl.$setValidity('reglaNegocio', true);
                            });
                        }
                    });

                    elem.bind('keyup', function() {

                        if (ctrl.$error.reglaNegocio && ctrl.$error.reglaNegocio === true) {
                            if (elem.oldValueReglaNegocioDirective !== elem.val()) {
                                elem.oldValueReglaNegocioDirective = null;
                                scope.$apply(function() {
                                    ctrl.$setValidity('reglaNegocio', true);
                                });
                            } else if (!elem.val()) {
                                scope.$apply(function() {
                                    ctrl.$setValidity('reglaNegocio', true);
                                });
                            }
                        }
                    });
                }
            }
        }
    ])