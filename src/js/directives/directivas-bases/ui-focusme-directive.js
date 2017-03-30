/**
 * Esta directiva se encarga de informar si el elemento se encuentra en el focus de la página
 * también se encarga de manejar la aplicación de estilos al elemento
 * @class
 * @name master.directive.focused
 * @author <a href="mailto:ggimenez@konecta.com.py">Gabriel Alberto Giménez</a>
 */

angular.module('focusme', [])

.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
                if (value === true) {
                    // console.log('value=', value);
                    //$timeout(function() {
                    element[0].focus();
                    scope[attrs.focusMe] = false;
                    //});
                }
            });
        }
    };
});