/**
 * Esta clase se encarga de definir un controlador de Login 
 *
 * @class
 * @name master.controller.LoginController
 * @author 
 * <>
 */
/**
 * Se define el controller y sus dependencias.
 */
app.controller('LoginController', ['$rootScope', '$scope', 'Auth', '$location', '$dialogs',
	function ($rootScope, $scope, auth, $location, $dialogs) {

        /**
         * username para autenticación 
         * @type Array{String}
         * @field
         *
         * @name master.controller.LoginController#usuario
         */
        $scope.usuario = "";
        /**
         * pass para autenticación 
         * @type Array{String}
         * @field
         *
         * @name master.controller.LoginController#passwd
         */
        $scope.passwd = "";

        /**
         * Este método se encarga de terminar la sesión.
         * 
         * @function
         * @public
         * @author <a href="mailto:lmartinez@konecta.com.py">Lamia Martínez</a>
         * @name master.controller.LoginController#logout
         */
        /*$rootScope.logout = function () {
            console.log('sakur');
            //auth.clear();
            $location.path("/login");
        };*/

        /**
         * Este método se encarga de iniciar sesión.
         * 
         * @function
         * @public
         * @author <a href="mailto:lmartinez@konecta.com.py">Lamia Martínez</a>
         * @name master.controller.LoginController#login
         */
        $scope.login = function () {


            // se obtiene  el requestToken siguiendo los pasos del diagrama 
            // http://blog.s21sec.com/2012/06/oauth-open-authorization-protocol.html
            var requestToken = auth.getItem("requestToken");
            // verifica si ya existe el requestToken
            // si todavía no existe crea el evento requestToken-obtenido' para esperar el requestToken

            if (requestToken != null) {
                getToken();
            } else {

                $rootScope.$on("requestToken-obtenido", function () {
                    getToken();
                });

            }
        };

        /**
         * Este método se encarga de obtener el token de sesión.
         * @function
         *
         * @private
         * @author <a href="mailto:lmartinez@konecta.com.py">Lamia Martinez</a>
         * @name master.controller.LoginController#getToken
         */
        function getToken() {


            // se simula una peticion exitosa y se trae los datos correspondientes
            if ($scope.usuario && $scope.passwd) {

                auth.isLogged = true;
                auth.username = $scope.usuario;
                var datoUsuario = {};
                datoUsuario.usuario = $scope.usuario;
                datoUsuario.userToken = 'userToken';
                $rootScope.$broadcast("login-existoso", datoUsuario);

            } else {

                auth.isLogged = false;
                auth.username = '';
                console.log('Acceso no autorizado');
                $rootScope.$broadcast("fallo-logueo");
            }

        };

        /**
         * funcion llamado por el evento 'login-existoso' que se inicia cuando
         * el proceso de login finalizó correctamente.
         * @function       
         * @private
         * @name cml3.controller.LoginController#loginExitoso
         * @author <a href="mailto:lmartinez@konecta.com.py">Lamia Martínez</a>
         * @param {Object}data
         */
        function loginExitoso(data) {

            if (typeof (Storage) !== "undefined") {
                //se guarda el Token y el id del usurario logueado en la sesión del navegador                 
                auth.setItem("usuario", data.usuario);
                auth.setToken(data.userToken);
                //se redirecciona a /home
                // $location.path("/");
                var redirect = MasterUrl.redirectToModule;
                window.location = redirect;
            } else {
                alert("Sorry! No web storage support");
            }
        };

        /**
         * funcion llamado por el evento 'fallo-logueo' que se inicia cuando
         * ocurrio algun error en el proceso de login.
         * @function       
         * @private
         * @name cml3.controller.LoginController#falloLogueo
         * @author <a href="mailto:lmartinez@konecta.com.py">Lamia Martínez</a>
         * @param {Object}data
         */
        function falloLogueo(data) {
            var dlg = $dialogs.error('Error al iniciar session');
            //alert("Error al iniciar");
        };




        function initialize() {


            //se añaden los eventos al  $rootScope
            $rootScope.$on("fallo-logueo", function () {
                falloLogueo();
            });
            $rootScope.$on("login-existoso", function (event, dato) {
                loginExitoso(dato);
            });

            auth.inicialize();


        };

        initialize();

        // Funciones para ocultar el menu
        // $('#wrapper').removeClass('active');
        // $('#wrapper .navbar-fixed-top').hide();
        // $('#page-content-nav').hide();
        // centrarLogin();
        // $('body').attr('onresize','centrarLogin()');
	}
])