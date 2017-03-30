/**
 * Esta clase contiene una expectacular directiva de formateo de números desarrollado por Lamia Martinez,
 * ademas tiene otros tipos de formateos
 *
 * @class
 * @name master.directives.breadcrumb-directive
 * @author <>
 */
/**
 * se define el modulo
 *
 * @constructor
 * @author <>
 */

angular.module('formaters', [])
    /**
     * Directiva utilizada para convertir a mayusculas cada caracter ingresado en los Inputs
     *
     * */
    .directive('uppercase', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue) {
                        var capitalized = inputValue.toUpperCase();
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    }
                    return;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    })


/**
 * Directiva utilizada para formateo de Números
 *
 * */
.directive('formatNumber', ['$filter',
        function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.push(function (a) {

                    return $filter('number')(ctrl.$modelValue)
                });


                ctrl.$parsers.unshift(function (viewValue) {


                    var val = viewValue.replace(/[A-Za-z$-]/g, "");
                    var plainNumber = val.replace(/\./g, '');
                    var plainNumber = plainNumber.replace(/\,/g, '.');


                    var input = plainNumber.toString().replace("([^0-9]|[^a-zA-Z]|-)", "");

                    input = input.toString().replace(/\./g, ',');

                    input = input.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    elem.val(input);

                    return plainNumber;
                });
            }
        };
        }
    ])

/**
 * Directiva utilizada para convertir a minusculas cada caracter ingresado en los Inputs
 *
 * */
.directive('lowercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue) {
                    var capitalized = inputValue.toLowerCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                return;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
})