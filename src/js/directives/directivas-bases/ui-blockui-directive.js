/**
 * Esta directiva encapsula el plugin Blockui de jQuery
 * <a href ="http://www.malsup.com/jquery/block/</a>
 *
 * @class
 * @name master.directive.uiBlockui
 * @author <a href="mailto:ggimenez@konecta.com.py">Gabriel Alberto Giménez</a>
 */

angular.module('blockui', [])

/*
 * Se define la directiva
 */
.directive('uiBlockui', function($compile) {
    return {

        //Se restringe a tipo Element
        restrict: 'AE',
        //se define un scope independiente para la directiva

        //link function
        link: function($scope, el, attr, ctrl) {

            /*Función que se encarga de mostrar/ocultar el efecto de bloqueo
             * @function
             *
             * @name tasacion.directive.uiBlockui#renderManager
             */
            var renderManager = function(scope, iElement, iAttrs, controller) {


                if (iAttrs.uiBlockuiConfig && iAttrs.uiBlockuiConfig.bloquear) {
                    $.blockUI({
                        css: {
                            border: 'none',
                            padding: '15px',
                            backgroundColor: '#000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .5,
                            color: '#fff',
                        },
                        baseZ: 10000,
                        message: "Por favor espere...",
                    });
                } else {
                    $.unblockUI();
                }

            }

            if (angular.isUndefined(attr.class)) {
                //se hace watch del objeto de configuración
                $scope.$watch('uiBlockuiConfig', renderManager, true);
            } else {
                var mensaje = $scope.$eval(attr.uiBlockuiConfig).message || "Por favor espere...";
                $scope.$watch(attr.uiBlockuiConfig, function(valor) {
                    if (valor && valor.bloquear) {
                        el.block({
                            css: {
                                border: 'none',
                                padding: '15px',
                                backgroundColor: '#000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .5,
                                color: '#fff',
                            },
                            baseZ: 999,
                            message: valor.message,
                        });
                    } else {
                        el.unblock();
                    }
                }, true);
            }
        }
    };
});