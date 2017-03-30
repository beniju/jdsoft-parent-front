/**
 * Define un módulo que se encarga de descargar los scripts bajo demanda
 * utilizando requirejs.
 * <a href='http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx'>
 * Fuente</a>
 *
 * @class
 * @name master.service.RouteResolver
 * @author <>
 */
angular.module('RouteResolverServices', [])
    /**
     * Se define un provider para que este pueda ser injectado en
     * module.config().
     *
     * @constructor
     * @author <>
     */
    .provider('RouteResolver', function () {

        this.$get = function () {
            return this;
        };
        /**
         * Parámetros de configuración que indican los paths de los cuales
         * se descargaran los partials y controllers
         * @type Object
         * @field
         *
         * @name master.service.RouteResolver#routeConfig
         */
        this.routeConfig = {
            partialsPath: '',
            controllersPath: ''
        };

        /**
         * Se encarga de cargar el controller
         * @function
         * @private
         *
         * @name master.service.RouteResolver#resolveDependencies
         * @author <>
         */
        var resolveDependencies = function ($q, $rootScope, dependencies) {
            var deferred = $q.defer();
            require(dependencies, function () {
                $rootScope.$apply(function () {
                    deferred.resolve();
                });
            });
            return deferred.promise;
        };

        /**
         * Se encarga de capitalizar la cadena que se encuentra
         * separada por giones.
         * @function
         * @private
         * @example
         * var str = "test-controller";
         * var capital = capitalize(str);
         * >> 'TestController'
         *
         * @params {String}dashedName El nombre separado por giones.
         * @name master.service.RouteResolver#capitalize
         * @author <>
         *
         * @return {String} El string en formato camelCase
         */
        var capitalize = function (dashedName) {
            var toCapitalize = dashedName.split("-");
            var capitalizeName = "";
            for (var i = 0; i < toCapitalize.length; i++) {
                var str = toCapitalize[i];
                capitalizeName += str[0].toUpperCase() + str.slice(1);
            }
            return capitalizeName;
        };

        /**
         * Se encarga de procesar el path del controller y extraer el
         * nombre del mismo, para ello el nombre del archivo debe
         * coincidir con el nombre con el cual se registró el controller.
         * @function
         * @private
         *
         * @params options
         * @config {String}templateUrl El path del template.
         * @config {String}controller El path del controller.
         * @name master.service.RouteResolver#getControllerName
         *
         * @author <>
         *
         * @returns {String}controller El nombre del controller
         * @returns {String}templateUrl El path del template
         */
        var getControllerName = function (options) {
            var controllerPath = options.controller;
            var splited = controllerPath.split("/");
            var dashedController = splited[splited.length - 1]
            var controllerName = capitalize(dashedController);
            //se setan los parametros
            options.controller = controllerName;
            options.controllerPath = controllerPath;
            return options;
        };

        /**
         * Se encarga de resolver las dependencias
         * @function
         * @public
         *
         * @params options
         * @config {String}templateUrl
         * @config {String}controller
         * @name master.service.RouteResolver#resolve
         * @author <>
         *
         * @returns {String}controller El nombre del controller
         * @returns {String}templateUrl El path del template
         * @returns {Function}resolve La función que se encarga de
         *          resolver el controller.
         */
        this.resolve = function (options) {
            var config = getControllerName(options);
            options.resolve = {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = [options.controllerPath];
                    return resolveDependencies($q, $rootScope, dependencies);
                }]
            };

            return options;
        };
    })