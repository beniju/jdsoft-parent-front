/**
 * Esta clase se encarga de gestionar el breadcrumb
 *
 * @class
 * @name master.directives.breadcrumb-directive
 * @author <>
 */
'use strict'
/**
 * se define el modulo
 *
 * @constructor
 * @author <>
 */

angular.module('breadcrumb', [])



.directive('uiBreadcrumb',
    function () {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: '/base/js/template/breadcrumb/breadcrumb.html',
            controller: function ($scope, $location, $route) {
                var pathElements = $location.path().split('/'),
                    result = [],
                    i;

                pathElements[0] = '/';

                /*
                 * Carga las rutas para que pueda ser leidas por el ng-repeat
                 */

                var path = "";

                angular.forEach(pathElements, function (item) {
                    item = item.trim();
                    var last = pathElements.indexOf(item) == (pathElements.length - 1);

                    if (item == "" || (path[path.length - 1] != '/')) {
                        path += '/';
                    }


                    // Esto comprueba ID es entero o float y anexa ": id" a la ruta  
                    if ((parseFloat(item) == parseInt(item)) && !isNaN(item)) {
                        path += ":id";
                    } else {
                        if (item != '/') {
                            path += item;
                        }
                    }

                    if ($route.routes.hasOwnProperty(path)) {


                        var titulo = $route.routes[path].titulo;

                        result.push({
                            name: $route.routes[path].titulo,
                            path: '#' + path
                        });

                    }
                });
                $scope.breadcrumbs = result;
            }
        }
    }
);