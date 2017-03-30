/**
 * Esta directiva se encarga de inyectar dinámicamente los controllers a los partials
 * @class
 * @name master.directive.dynamic-controller-directive
 * @author <a href="mailto:marcelo.szcerba@konecta.com.py">Marcelo Fabian Szcerba</a>
 */

    /*
     * Se define la directiva
     */

    angular.module('dynamicController', [])

    .directive('dynamicController', function($compile, $controller) {
            return {
                //se restringe a que solo se pueda usar como Atributo
                restrict: 'A',
                terminal: true,

                //link function
                link: function(scope, elm, attrs) {
                    var lastScope;

                    /**
                     * Se hace watch de la función que se encarga de cargar dinámicamente
                     * el controller del partial que se desea mostrar
                     * @function
                     *
                     * @name js.directives.dynamicController#
                     */
                    scope.$watch(attrs.dynamicController, function(ctrlName) {
                        if (lastScope) lastScope.$destroy();
                        var newScope = scope.$new();
                        var ctrl = $controller(ctrlName, {$scope: newScope});
                        elm.contents().data('$ngControllerController', ctrl);
                        $compile(elm.contents())(newScope);

                        lastScope = newScope;
                    });
                }
            };
        });
