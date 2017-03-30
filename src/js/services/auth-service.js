/**
 * Define un módulo de Auntenticación
 * @class
 * @name master.service.AuthService
 * @author <>
 */

angular.module('AuthService', [])

.provider('Auth', function () {

    this.$get = function ($rootScope) {


        /**
         * Elemento persistente que almacena la sesión del usuario
         * @field
         * @type Storage
         */
        var session = sessionStorage;
        var userToken = session.getItem('userToken');




        return {
            /**
             * funcion que agrega al header el token obtenidos
             * @function       
             * @name UserService.Usuario#setHeaders
             * @author 
             * @param {Object} token
             */

            setHeaders: function (token) {
                if (!token) {
                    delete $http.defaults.headers.common['X-Token'];
                    return;
                }
                $http.defaults.headers.common['X-Token'] = token.toString();
            },

            /**
             * funcion que agregar el Token al sessionStorange
             * @function       
             * @name UserService.Usuario#setToken
             * @author <>
             * @param {Object} token
             */
            setToken: function (token) {
                if (!token) {
                    session.removeItem('userToken');
                } else {
                    session.setItem('userToken', token);
                }
                //Cuando ya este en funcionamiento el oAuth
                //setHeaders(token);
            },

            /**
             * Constructor de la clase
             * @function
             * @constructor
             */
            inicialize: function () {
                var accessToken = session.getItem("accessToken");
                //se obtiene los datos del storage si es que estos datos ya existen
                if ((accessToken == null || accessToken.length == 0) ||
                    (requestToken == null || requestToken.length == 0)) {
                    this.clear();
                    this.getRequesToken();
                } else {
                    $rootScope.$broadcast("requestToken-obtenido")
                }


            },

            /**
             * Se encarga de eliminar todas las configuraciones de la sesión.
             * @function
             *
             * @author <>
             * @name UserService.Usuario#clear
             */
            clear: function () {
                return session.clear();
            },
            /**
             * Se encarga de obtener un elemento del storage.
             * @function
             *
             * @author <>
             * @name UserService.Usuario#getItem
             */
            getItem: function (item) {
                return session.getItem(item);
            },

            /**
             * Se encarga de eliminar un elemento del storage.
             * @function
             *
             * @author <>
             * @name UserService.Usuario#removeItem
             */
            removeItem: function (item) {
                return session.removeItem(item);
            },

            /**
             * Se encarga de añadir un elemento al storage.
             * @function
             *
             * @author <>
             * @name UserService.Usuario#setItem
             */
            setItem: function (item, value) {
                session.setItem(item, value);
            },

            /**
             * Este método se encarga de obtener el requestToken.
             * @function
             *
             * @private
             * @author <>
             * @name UserService.Usuario#getRequesToken
             */
            getRequesToken: function () {

                // se simula la obtencion del token y setea un número cualquiera       
                session.setItem("requestToken", "000000000000");
                $rootScope.$broadcast("requestToken-obtenido")


            }

        };
    };
})