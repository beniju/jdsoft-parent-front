/**
 * Esta clase se encarga de gestionar el breadcrumb
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

angular.module('modernizr', [])

.directive('placeholder', ['$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {

                // Special case for type=password adds password=true attr
                if (attrs.type === 'password') {
                    attrs.$set('password', true);
                }

                function focus() {
                    //console.log('focus');
                    if (element.val() === attrs.placeholder && !ngModel.$viewValue) {
                        element.val('');
                        if (attrs.password) {
                            try {
                                element[0].type = 'password';
                            } catch (e) {}
                        }
                    }
                }

                function blur() {
                    //console.log('blur');
                    if ((element.val() === '' || element.val() === attrs.placeholder) && !ngModel.$viewValue) {
                        element.val(attrs.placeholder);
                        if (attrs.password) {
                            try {
                                element[0].type = 'text';
                            } catch (e) {}
                        }
                    }
                }

                function keyup(e) {
                    //console.log('keypress');
                    //console.log(e);
                    if (!ngModel.$viewValue) {
                        element.addClass('forms-placeholder');
                    } else {
                        element.removeClass('forms-placeholder');
                    }
                }

                element.bind('focus', focus);
                element.bind('blur', blur);
                element.bind('keyup', keyup);

                //blur(); // for static strings - doesn't work (needed)
                attrs.$observe('placeholder', blur); // for dynamic strings
                $timeout(blur, 0); // for static
                $timeout(keyup, 0); // called on model render
            }
        };
    }
])