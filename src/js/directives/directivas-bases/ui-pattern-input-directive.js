/**
 * pattern input es un componente ayuda a manipular por medio de patrones la claves.
 *
 * @class
 * @name directives.directives-bases.pattern-input-directive
 * @author <a href="mailto:juan.rolon@konecta.com.py">Juan Manuel Rolón</a>
 */
/**
 *
 * @constructor
 * @author <a href="mailto:juan.rolon@konecta.com.py">Juan Manuel Rolón</a>
 */
angular.module('uiPatternInput', [])

.directive('uiPatternInput', function() {

    return {
        restrict: 'EA',
        scope: {
            id: '@',
            verticalDots: '=',
            horizontalDots: '=',
            autoClear: '=',
            onChange: "&",
            onFinish: '&',
            logger: '&'
        },
        replace: true,
        template: '<div class="pattern-input" ontouchmove="blockElasticScroll(event);" id></div>',
        link: function(scope, element, attrs) {
            scope.createPattern(attrs.id);
        },
        controller: function($scope, $attrs, patternAPI) {

            $scope.options = {
                width: parseInt($attrs['horizontalDots']) * 100,
                height: parseInt($attrs['verticalDots']) * 100,
                verticalDots: $attrs['verticalDots'],
                horizontalDots: $attrs['horizontalDots'],
                autoClear: !Boolean($attrs['autoClear']),
                onChange: $attrs['onChange'],
                onFinish: function(pattern) {
                    $scope.onFinish({
                        pattern: pattern
                    });
                    $scope.$apply();
                },
                logger: $attrs['logger']
            };

            $scope.api = patternAPI;

            $scope.$watch('api.arrayPattern', setPattern);

            $scope.blockElasticScroll = function(event) {
                event.preventDefault();
            };

            $scope.createPattern = function(panelId) {
                $("#" + panelId).patternInput("init", $scope.options);
            };

            $scope.getSequence = function(panelId) {
                var seq = $("#" + panelId).patternInput("getLastSequence");
                if (seq) {
                    alert("Last sequence of " + panelId + " is " + seq.join(","));
                } else {
                    alert("There's no last sequence for " + panelId);
                }
            };

            $scope.clearSequence = function(panelId) {
                $("#" + panelId).patternInput("clear");
            };

            /**
             * Esta funcion se encarga de llamar al metodo que generar los patrones
             */
            function setPattern() {
                if ($scope.api.arrayPattern && $scope.api.arrayPattern.length > 0) {
                    $("#" + $scope.api.panelId).patternInput("setSequence", $scope.api.arrayPattern);
                }
            }
        }
    }
})

/**
 *
 */
.factory('patternAPI', function() {
    return {
        panelId: null,
        arrayPattern: null,

        /**
         *
         * @param panelId
         * @param arrayPattern
         */
        setPattern: function(panelId, arrayPattern) {
            this.arrayPattern = arrayPattern;
            this.panelId = panelId;
        }
    }
})

/**
 *
 */
.service('$pattern', ['patternAPI', function(patternAPI) {
    return {
        /**
         * Esta funcion se encarga de setear los patrones seleccionados automaticamente
         * @param panelId
         * @param arrayPattern
         */
        setPattern: function(panelId, arrayPattern) {
            patternAPI.setPattern(panelId, arrayPattern);
        }
    }
}])