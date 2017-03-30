app.config([
    '$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
    function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

        $routeProvider.when('/', {
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/login', {
            templateUrl: 'partials/login-tmpl.html',
            controller: 'LoginController'
        });


        $routeProvider.when('/404', {
            templateUrl: 'partials/404-partial.html',
            controller: '404Controller'
        });

        $routeProvider.when('/401403', {
            templateUrl: '/master/partials/401-403-partial.html',
            controller: '401403Controller'
        });

        $routeProvider.otherwise({
            redirectTo: '/404'
        });

    }
]);

app.run(['$rootScope', '$location', '$templateCache', 'Auth',

    function ($rootScope, $location, $templateCache, Auth) {

        /* $rootScope.logout = function () {

             alert("saliste del menu");
             Auth.loggedIn = false;
             var redirect = Auth.logoutUrl;
             Auth.authz = null;
             console.log(redirect);
             window.location = redirect;
         };

         $rootScope.habilitarMenu = function (aplicacion, rolPorDefecto) {
             return true;
         };

         //metodo de ejemplo para
         //esconder un submenu en el modulo de postventa
         $rootScope.habilitarSubMenu = function (rol) {
             return Auth.authz.hasResourceRole(rol, 'postventa');
         };*/



        $rootScope.$on("$routeChangeStart", function (event, next, current) {


            if (!sessionStorage.getItem('userToken')) {

                $location.path("/login");
            }


        });

        $rootScope.logout = function () {
            sessionStorage.clear();
            window.location.reload();
        };


        $rootScope.esLogin = function () {
            if ($location.path() == "/login") {
                return true;
            } else {
                return false;
            }

        };
        $rootScope.habilitarMenu = function (aplicacion, rolPorDefecto) {
            return true;
        };
        $rootScope.habilitarSubMenu = function (rol) {
            return Auth.authz.hasResourceRole(rol, 'postventa');
            //return true;
        };


    }
]);