/**
 * Esta directiva se encarga de administrar la vizualización de los Alerts Boxes
 * <a href ="http://getbootstrap.com/components/#alerts.</a>
 *
 * @class
 * @name master.directive.uiAlert
 * @author <a href="mailto:ggimenez@konecta.com.py">Gabriel Alberto Giménez</a>
 */


angular.module('alert', [])

/**
 * Se inizializa el factory para los servicios "non singletons" del Alert.
 *
 * @constructor
 * @author <a href="mailto:ggimenez@konecta.com.py">Gabriel A. Giménez</a>
 */
.factory('AlertServices', function() {

    var serviceProvider = function() {
        /**
         * Lista de Alertas a mostrar , un elemento Alerta está formado por un ID/Grupo de Alerta,
         * un Index que indica en que orden se mostrará el mensaje en el AlertBox y un conjunto de
         * de mensajes de alerta asociados al ID/Grupo.
         * @type Object Array
         * @field
         *
         */
        var alertsToShow = [];
        return {

            /**
             * Esta función se encarga de comparar la existencia de un mensaje de alerta asociado a un Grupo.
             *
             * @param {numerico}grupoIndex index del Grupo en la lista
             * @param {string}errorToFind mensaje de alerta a encontrar
             * @return {boolean}
             */
            alertExistInGroup: function(grupoIndex, errorToFind) {
                var respuesta = false;

                for (var i = 0; i < alertsToShow[grupoIndex].errores.length; i++) {
                    if (alertsToShow[grupoIndex].errores[i] === errorToFind) {
                        respuesta = true;
                        break;
                    }
                }

                return respuesta;
            },

            /**
             * Esta función se encarga de retornar la posición del Grupo en el Array de grupos de mensajes.
             *
             * @param {string}groupName nombre del Grupo
             * @param {string}errorToFind mensaje de alerta a encontrar
             * @return {numerico} la posición buscada, si no se encuentra el Grupo se retornará -1
             */
            getIndexOfGroup: function(groupName) {
                var respuesta = -1;
                if (alertsToShow.length !== 0) {
                    for (var i = 0; i < alertsToShow.length; i++) {
                        if (alertsToShow[i].grupo === groupName) {
                            respuesta = i;
                            break;
                        }
                    }
                }
                return respuesta;
            },


            /**
             * Esta función se encarga de comprobar la existencia de un Grupo en el conjunto de grupos de alertas.
             *
             * @param {groupName}groupName nombre del Grupo
             * @return {boolean} true si se encontró o false si no
             */
            existsAlertGroup: function(groupName) {
                var respuesta = false;
                if (this.getIndexOfGroup(groupName) !== -1) {
                    respuesta = true;
                }
                return respuesta;
            },

            /**
             * Esta función se encarga de obtener el mayor valor de Index en la lista de alertas.
             *
             * @return {numerico}
             */
            getLastGroupOrder: function() {
                var lastIndex = 0;
                if (alertsToShow.length !== 0) {
                    for (var i = 0; i < alertsToShow.length; i++) {
                        if (alertsToShow[i].index > lastIndex) {
                            lastIndex = alertsToShow[i].index;
                        }
                    }
                }
                return lastIndex;
            },

            /**
             * Esta función se encarga de retornar la lista de alertas a mostrar.
             *
             * @param {numerico}grupoIndex index del Grupo en la lista
             * @param {string}errorToFind mensaje de alerta a encontrar
             * @return {Object Array}
             */
            getAlertsToShow: function() {
                return alertsToShow;
            },


            /**
             * Se encarga de agregar un simple mensaje de alerta
             *
             * @param {string} id identificador del mensaje, si el parámetro es undefined se toma con id al parámetro error
             * @param {index} orden en el cual se mostrará el o los mensajes, si es undefined se mostrará al final de todos
             * @param {string/String Array} error mensaje o conjunto de mensajes de alerta
             */
            addSimpleAlert: function(id, index, error) {
                var detailMessage = 'undefined';
                var errores = error;

                if (!id) {
                    id = error;
                }

                if (error instanceof Object) {
                    if (typeof(error.message) != 'undefined') {
                        errores = error.message;
                        detailMessage = {
                            header: 'Ha ocurrido un error inesperado. Consulte con soporte.',
                            showHeader: true
                        };
                    } else {
                        errores = error.messages;
                        detailMessage = error.detailMessage;
                    }
                }

                if (!(errores instanceof Array)) {
                    var wrapperArray = [];
                    wrapperArray.push(errores);
                    this.addNewAlertGroup(id, null, wrapperArray, detailMessage);
                } else {
                    this.addNewAlertGroup(id, null, errores, detailMessage);
                }

            },


            /**
             * Se encarga de eliminar un mensaje de alerta simple
             *
             * @param {string} identificador del mensaje de alerta
             */
            deleteSimpleAlert: function(alertID) {
                this.deleteGroup(alertID);
            },

            /**
             * Se encarga de agregar un grupo de mensajes de alerta
             *
             * @param {string} id identificador del grupo de mensajes
             * @param {orden} orden en el cual se mostrarán los mensajes, si es undefined se mostrará al final de todos
             * @param {String Array} errores conjunto de mensajes de alerta
             */
            addNewAlertGroup: function(grupo, orden, errores, detailMessage) {
                if (!orden) {
                    orden = this.getLastGroupOrder() + 1;
                }

                alertsToShow.showHeader = false;
                alertsToShow.header = '';

                if (typeof(detailMessage) != 'undefined' && (detailMessage instanceof Object)) {
                    alertsToShow.showHeader = detailMessage.showHeader;
                    alertsToShow.header = detailMessage.header;

                    //verificamos si es un array el error
                    if (errores instanceof Array) {
                        var corte = 110;
                        for (i = 0; i < errores.length; i++) {
                            if (errores[i] != null) {
                                var posIni = 0;
                                var posFin = corte;
                                var text = '';
                                while (posIni < errores[i].length) {
                                    text += (errores[i].substring(posIni, posFin) + ' ');
                                    posIni = posFin;
                                    posFin += corte;
                                }

                                errores[i] = text;
                            }
                        }
                    }
                }

                if (this.existsAlertGroup(grupo)) {
                    alertsToShow[this.getIndexOfGroup(grupo)].errores =
                        alertsToShow[this.getIndexOfGroup(grupo)].errores.concat(errores);
                    alertsToShow[this.getIndexOfGroup(grupo)].errores =
                        this.uniqueArray(alertsToShow[this.getIndexOfGroup(grupo)].errores);
                } else {
                    alertsToShow.push({
                        grupo: grupo,
                        orden: orden,
                        errores: errores
                    });
                }
            },


            /**
             * Se encarga de validar que no se ingresen mensajes repetidos
             *
             * @param {string} message Mensaje a buscar
             * @param {String Array} arrayError array de mensajes sobre el cual se realiza la búsqueda
             */
            existsErrorMessage: function(message, arrayError) {
                var respuesta = false;
                for (var i = 0; i < arrayError.length; i++) {
                    if (arrayError[i] === message) {
                        respuesta = true;
                        break;
                    }
                }
                return respuesta;
            },

            /**
             * Se encarga de borrar duplicados en un array
             *
             * @param {string} message Mensaje a buscar
             * @param {Object Array} theArray array del cual borrar los duplicados
             */
            uniqueArray: function(theArray) {
                var a = theArray.concat();
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (a[i] === a[j])
                            a.splice(j--, 1);
                    }
                }

                return a;
            },


            /**
             * Se encarga de agregar un mensaje  mensajes de alerta
             *
             * @param {string} id identificador del grupo de mensajes
             * @param {String} error mensaje a agregar
             */
            addAlertToGroup: function(grupo, error) {
                if (this.existsAlertGroup(grupo) && !this.existsErrorMessage(error, alertsToShow[this.getIndexOfGroup(grupo)].errores)) {
                    alertsToShow[this.getIndexOfGroup(grupo)].errores.push(error);
                }
            },


            /**
             * Se encarga de agregar un grupo de mensajes de alerta
             *
             * @param {string} id identificador del grupo de mensajes
             * @param {String} error mensaje a agregar
             */
            addAlertsToGroup: function(grupo, errores) {
                if (this.existsAlertGroup(grupo)) {

                    alertsToShow[this.getIndexOfGroup(grupo)].errores =
                        alertsToShow[this.getIndexOfGroup(grupo)].errores.concat(errores);
                    alertsToShow[this.getIndexOfGroup(grupo)].errores =
                        this.uniqueArray(alertsToShow[this.getIndexOfGroup(grupo)].errores);
                }
            },

            /**
             * Elimina todos grupos de mensajes y simples mensajes.
             */
            deleteAll: function() {
                alertsToShow = [];
            },

            /*Elimina todos los mesajes de todos los grupos de mensajes.
             */
            deleteAlerts: function() {
                if (alertsToShow.length !== 0) {
                    for (var i = 0; i < alertsToShow.length; i++) {
                        alertsToShow[i].header = {};
                        alertsToShow[i].errores = [];
                    }
                }
            },

            /**
             * Se encarga de eliminar todos los mensajes de alerta asociados a un grupo
             *
             * @param {string} grupo identificador del grupo de mensajes
             */
            clearAlertsGroup: function(grupo) {
                alertsToShow.header = {};
                if (this.existsAlertGroup(grupo)) {
                    alertsToShow[this.getIndexOfGroup(grupo)].errores = [];
                }
            },

            /**
             * Se encarga de eliminar un grupo de mensajes y consecuentemente todos sus mensajes asociados
             *
             * @param {string} grupo identificador del grupo de mensajes
             */
            deleteGroup: function(grupo) {
                if (this.existsAlertGroup(grupo)) {
                    alertsToShow.splice(this.getIndexOfGroup(grupo), 1);
                }
            },
        }
    };

    /*
     * Objecto que se encarga de retornar instancias del servicio
     * @type Object
     */
    var service = {
        getInstance: function() {
            return new serviceProvider();
        }
    }

    return service;
})

/*
 * Se define la directiva
 */
.directive('uiAlert', ['$timeout', '$location', '$anchorScroll',
    function($timeout, $location, $anchorScroll) {
        return {
            //Se restringe a tipo Element
            restrict: 'E',

            //se hace referencia al template
            templateUrl: '/master/js/template/alert/alert.html',
            transclude: true,
            replace: true,

            //se define un scope independiente para la directiva
            scope: {
                //servicios que administran la lista de alertas a mostrar
                alertService: '=',
                /*
                 * objeto de configuración de la directiva, campos de configuración :
                 *   'closeable': boolean, indica si el Alert Box puede o no cerrarse desde la vista
                 *   'closeableonce': igual al 'closeable' pero la configuración solo tiene efecto una sola vez.
                 *   'timeout': number, si está definido indica la cantidad de milisegundos que se mostrará el alert box
                 luego de pasado este timepo se invocará al método scope.close definido en la función link.
                 'timeoutonce': igual al 'timeout' pero la configuración solo tiene efecto una sola vez.
                 'type': 'success','info', 'warning' y 'danger'  ,
                 dependiendo del tipo de Alert Box se aplica un determinado estilo.
                 */
                alertConfig: '='
            },
            link: function(scope, iElement, iAttrs, controller) {

                //scope variable que indica si el Alert Box es closeable o no.
                scope.closeable = false;
                scope.openCollapse = false;
                //lista de alertas a mostrar asociado a la vista
                scope.alertsToShow = [];

                /* 
                 * método que indica si el Box debe ser mostrado o no,
                 * retorna true cuando existe al menos un mensaje que mostrar
                 */
                scope.showAlertBox = function() {
                    respuesta = false;
                    if (scope.alertsToShow.length !== 0) {
                        if (scope.alertsToShow.length !== 0) {
                            for (var i = 0; i < scope.alertsToShow.length; i++) {
                                if (scope.alertsToShow[i].errores.length !== 0) {
                                    respuesta = true;
                                    break;
                                }
                            }
                        }
                    }

                    return respuesta;
                };

                /*scope function asociado al botón de cerrar del alert box.
                 */
                scope.close = function() {
                    scope.openCollapse = false;
                    scope.alertsToShow.showHeader = false;

                    scope.alertService.deleteAlerts();
                    if (scope.alertConfig.closeableonce) {
                        delete scope.alertConfig.closeableonce;
                        scope.closeable = false;
                    }
                };

                /*Se está pendiente de cualquier cambio en la lista de mensajes a mostrar
                 * y se reflejan esos cambio en el Alert Box asociado.
                 */
                scope.$watch('alertService.getAlertsToShow()',
                    function(param) {
                        scope.alertsToShow = param;
                        if (scope.showAlertBox() && scope.alertConfig) {

                            if (scope.alertConfig.timeout) {
                                $timeout(
                                    function() {
                                        scope.close();
                                    }, scope.alertConfig.timeout, true);
                            }
                            if (scope.alertConfig.timeoutonce) {
                                $timeout(
                                    function() {
                                        scope.close();
                                        delete scope.alertConfig.timeoutonce;
                                    }, scope.alertConfig.timeoutonce, true);
                            }
                            if (scope.alertConfig.scroll && iElement[0].id) {
                                window.scrollTo(0, iElement[0].offsetTop);
                            }

                        }
                    },
                    true);

                /*Se está pendiente de cualquier cambio en el objeto de configuración de la directiva 
                 */
                scope.$watch('alertConfig',
                    function(configParam) {
                        scope.type = configParam.type;

                        if (configParam.closeable) {
                            scope.closeable = configParam.closeable;
                        }
                        if (configParam.closeableonce) {
                            scope.closeable = true;
                        }
                    },
                    true);

            }
        };
    }
]);