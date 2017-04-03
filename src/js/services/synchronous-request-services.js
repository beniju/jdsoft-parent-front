/**
 * Define un módulo de Utilidad
 *
 * @class
 * @name master.service.SynchronousRequestServices
 * @author <>
 */


angular.module('SynchronousRequestServices', [])
    /**
     * Se define un provider para que este pueda ser injectado en
     * module.config().
     *
     * @constructor
     * @author <>
     */
    .provider('SynchronousRequest', function () {

        this.$get = function () {
            return this;
        };

        this.isValidJson = function (json) {
            var isValid = true;
            try {
                JSON.parse(json);
            } catch (e) {
                isValid = false;
            }
            return isValid;
        };

        this.synchronousRequest = function (metodo, url, content) {
           // var auth = window.authFactory;
            //var nombreUsuario = auth.authz.idTokenParsed.preferred_username;
            //var refreshToken = MasterUtils.synchronousRequestRefreshToken(auth);

            var response = {};
            try {

                //esta logica agrega un param generado dinamicamente a la URL
                //para evitar el cacheo por parte del navegador.
                if (url) {
                    var paramToAvoidCache = '_t' + new Date().getTime() + '=' + new Date().getTime();
                    if (url.indexOf('?') != -1) {
                        var urlParts = url.split('?');
                        if (urlParts.length > 0) {
                            if (urlParts[1] && urlParts[1].trim() !== '') {
                                url += '&' + paramToAvoidCache;
                            } else {
                                url += paramToAvoidCache;
                            }
                        } else {
                            url += paramToAvoidCache;
                        }

                    } else {
                        url += '?' + paramToAvoidCache;
                    }
                }

                var xhr = new XMLHttpRequest();
                xhr.open(metodo, url, false);
                //xhr.setRequestHeader("Authorization", 'Bearer ' + auth.authz.token);
                //xhr.setRequestHeader("usuario", nombreUsuario);
                xhr.send();

                response.data = {};

                if (xhr.response && xhr.response != null) {
                    if (this.isValidJson(xhr.response)) {
                        response.data = JSON.parse(xhr.response);
                    } else {
                        response.data = xhr.response;
                    }
                }

                response.status = xhr.status;
                response.headers = content ? xhr.getResponseHeader(content) : xhr.getResponseHeader;
                response.config = {};

                if (xhr.status != 200 && xhr.status != 201) {
                    MasterUtils.redirectError(xhr.status);
                    response = MasterUtils.processResponse(response);
                }

            } catch (error) {
                console.log(error);

                response.data = {};
                response.status = 0;
                response.headers = content ? content : '';
                response.config = {};
                response = MasterUtils.processResponse(response);
            }

            return response;
        };
    })