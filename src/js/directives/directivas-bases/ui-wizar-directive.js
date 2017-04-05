/**
 * wizard es un componente ayuda a facilitar la creacion de un asistentes en su aplicación.
 *
 * @class
 * @name acreditacion.directives.wizard
 * @author <>
 */

/**
 *
 * @constructor
 * @author <>
 */
angular.module('wizard', [])
    .directive('wizard', function () {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                onBeforeStepChange: '&',
                onStepChanging: '&',
                onAfterStepChange: '&',
                onConfirm: '&',
                onCancel: '&'
            },

            templateUrl: '/base/js/template/wizar/wizard.html',

            replace: true,

            link: function (scope) {
                scope.currentStepIndex = 0;
                scope.steps[scope.currentStepIndex].currentStep = true;
            },

            controller: function ($scope, $attrs, wizardAPI) {
                $scope.steps = [];

                $scope.api = wizardAPI;

                $scope.$watch('api.currentStepIndex', setStepIndex);

                /**
                 * Esta funcion se encarga se reasignar el step deseado
                 */
                function setStepIndex() {
                    if ($scope.api.currentStepIndex && !isNaN($scope.api.currentStepIndex)) {
                        var index = 0;

                        if ($scope.api.currentStepIndex > 0 && $scope.api.currentStepIndex <= $scope.steps.length) {
                            index = $scope.api.currentStepIndex - 1;
                        } else if ($scope.api.currentStepIndex > $scope.steps.length) {
                            index = $scope.steps.length - 1;
                        }

                        $scope.steps[$scope.currentStepIndex].currentStep = false;

                        $scope.currentStepIndex = index;
                        $scope.steps[$scope.currentStepIndex].currentStep = true;

                        $scope.api.currentStepIndex = null;
                    }
                };

                this.registerStep = function (step) {
                    $scope.steps.push(step);
                };

                var toggleSteps = function (showIndex) {
                    var event = {
                        event: {
                            fromStep: $scope.currentStepIndex,
                            toStep: showIndex
                        }
                    };

                    if ($attrs['onBeforeStepChange'] !== undefined) {

                        $scope.onBeforeStepChange(event);
                    }
                    $scope.steps[$scope.currentStepIndex].currentStep = false;

                    if ($attrs['onStepChanging'] !== undefined) {
                        $scope.onStepChanging(event);
                    }

                    $scope.currentStepIndex = showIndex;

                    $scope.steps[$scope.currentStepIndex].currentStep = true;
                    if ($attrs['onAfterStepChange'] !== undefined) {
                        $scope.onAfterStepChange(event);
                    }
                };

                var confirm = function () {

                    if ($attrs['onConfirm'] !== undefined) {
                        $scope.onConfirm();
                        $scope.steps[$scope.currentStepIndex].currentStep = false;
                        $scope.currentStepIndex = 0;
                        $scope.steps[$scope.currentStepIndex].currentStep = true;
                    }
                };


                $scope.confirm = function () {
                    confirm();
                };

                $scope.cancel = function () {
                    if ($attrs['onCancel'] !== undefined) {
                        $scope.onCancel();
                    }
                };
                $scope.showNextStep = function () {
                    toggleSteps($scope.currentStepIndex + 1);
                };

                $scope.showPreviousStep = function () {
                    toggleSteps($scope.currentStepIndex - 1);
                };

                $scope.hasNext = function () {
                    return $scope.currentStepIndex < ($scope.steps.length - 1);
                };

                $scope.hasPrevious = function () {
                    return $scope.currentStepIndex > 0;
                };

                /**
                 * Funcion que verifica si el paso siguiente se debe desabilitar, dependiendo
                 *  de las validaciones del los steps
                 *
                 * @return {Boolean} [retorna true si se debe desabilitar el paso siguiente,
                 * retorna false si no se debe desabilitar el paso siguiente]
                 */
                $scope.isDisablePrevious = function () {
                    if ($scope.steps[$scope.currentStepIndex].isStepValid()) {
                        return false;
                    } else {
                        return true;
                    }
                };

            }
        };

    })

.directive('step', function () {

    return {
        require: "^wizard",
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@',
            stepValid: '&'

        },
        template: '<div class="step" ng-show="currentStep"></br><div ng-transclude></div> </div>',
        replace: true,

        link: function (scope, element, attrs, wizardController) {
            wizardController.registerStep(scope);
        },

        controller: function ($scope, $attrs) {
            /**
             * Esta funcion ejecuta la funcion de validacion stepValid del Step, si no se paso el parametro stepValid
             * entonces retorna true,  es valido ya que no posee funcion validador, asi se podra navegar
             * por el wizar sin problemas
             * @return {Boolean} [true si es valido el step, false si no es valido]
             */
            $scope.isStepValid = function () {

                if ($attrs['stepValid'] !== undefined) {
                    return $scope.stepValid();
                }
                return true;
            };

            $scope.getTitle = function () {

                return $scope.title;
            }
        }

    };

})

/**
 *
 */
.factory('wizardAPI', function () {
    return {
        currentStepIndex: null,

        /**
         * Esta funcion recibe el index del step a ser seteado
         * @param stepIndex
         */
        setStepIndex: function (stepIndex) {
            this.currentStepIndex = stepIndex;
        }
    }
})

/**
 *
 */
.service('$wizard', ['wizardAPI', function (wizardAPI) {
    return {
        /**
         * Esta funcion se encarga llamar al API que setea el step
         * @param stepIndex
         */
        setStepIndex: function (stepIndex) {
            wizardAPI.setStepIndex(stepIndex);
        }
    }
}])