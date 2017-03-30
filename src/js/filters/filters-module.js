angular.module('filtersModule', [])

/*
 * Filtro para convertir texto a formato de titulos.
 *
 *Ej: {{'ASUNCION del paraguay' | titleCase}} da como resultado "Asuncion Del Paraguay"
 *
 */
angular.module('filtersModule', []).filter('titleCase', function () {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
});
angular.module('filtersModule', []).filter('numberFixedLen', function () {
    return function (a, b) {
        if (isNaN(a)) {
            return a
        } else {
            return (1e4 + a + "").slice(-b);
        }
    };
});