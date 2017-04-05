/**
 * @namespace Clase utilitaria para manejo de URL, manejo de Fechas y Manejo de Acciones que no necesitan directivas
 */

/**
 * Manejo de url
 *
 */
var BaseUrl = {};

var DigiUrl = {};

DigiUrl.host = '@@urlDigi';

BaseUrl.host = '@@urlBase';

BaseUrl.serviceRest = '/digi/tanque-m3/';

BaseUrl.baseBaseUrl = "/base";

BaseUrl.baseModuloUrl = "/module/tanque/";

BaseUrl.redirectToModule = "";

BaseUrl.loginBaseUrl = BaseUrl.baseBaseUrl + "/login";

BaseUrl.error401403 = BaseUrl.baseBaseUrl + "#/401403";
BaseUrl.error404 = BaseUrl.baseBaseUrl + "#/404";
BaseUrl.keycloakFile = BaseUrl.host + '/base/keycloak.json';

/**
 * Construye la url partir de  path y y parametros
 *
 * @param  {String} path      el nombre del page  a cargar
 * @param  {String} paramtros parametros  a añadir en la url (opcional)
 * @return {String}   url formada
 */
BaseUrl.geturl = function (path, paramtros) {
    var url = "";
    if (path != null) {
        url = BaseUrl.baseURL + "/#/" + path + "/";
        if (paramtros) {
            url += "?";
            for (var param in paramtros) {
                url += param + "=" + paramtros[param] + "&";
            }
            url = url.substring(0, url.length - 1);
        }
    }

    return url;
};

/**
 * Construye  QueryParam  para la url
 * @param  {array} params [array de parametros]
 * @return {String}   parametros en formato queryParam
 */
BaseUrl.buildqueryParam = function (params) {
    var url = "";
    if (params) {
        url += "?";
        for (var param in params) {
            url += param + "=" + options[param] + "&";
        }
        url = url.substring(0, url.length - 1);
    }
    return url;
};

/**
 * Redirecciona a una pagina de acuerdo a los parametros
 * @param  {String} path      el nombre del page  a cargar
 * @param  {String} paramtros parametros  a añadir en la url (opcional)
 */
BaseUrl.redireccionar = function (path, paramtros) {

    window.location = this.getUrl(path, paramtros);
};


/**
 *  Utilitaria para manejo de Fechas
 */
var BaseUtils = {};

/**
 * Utilitaria para Manejo de acciones con respecto al DOM
 * @return {[type]} [description]
 */

BaseUtils.deleteValues = function (object) {
    Object.keys(object).forEach(function (key) {

        delete object[key];

    });
};

BaseUtils.deleteUndefinedValues = function (object) {
    Object.keys(object).forEach(function (key) {
        if (!object[key]) {
            delete object[key];
        }
    });
};

BaseUtils.dynamicSort = function (property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
};

function mostrarMenu() {
    $("#wrapper").toggleClass("active");
    $(window).trigger("resize");
}

function ocultarMenu() {
    $("#wrapper").removeClass("active");
    $(window).trigger("resize");
}

function mostrarSubmenu(boton) {
    var li = $(boton).parent();
    var submenu = li.find('.submenu');
    var submenu2 = li.find('.submenu2');
    if (li.hasClass('active')) {
        submenu.slideUp('fast');
        li.removeClass('active');
        submenu2.slideDown('fast');
    } else {
        submenu.hide();
        li.addClass('active');
        submenu.slideDown('fast');
        submenu2.slideUp('fast');
    }
}

/**
 * Funcion para redimensionar las grillas cuando cambia la resolucion de pantalla
 */
function resizeGrid(gridId) {
    grilla = $('#' + gridId);
    gridParent = $('#gbox_' + gridId).parent();
    gridParentWidth = gridParent.width();
    grillaFrozen = grilla.parent().parent().parent().find('.frozen-bdiv');

    if (gridParentWidth == 0) {
        return;
    }

    if ((grillaFrozen.width() + 100) > gridParentWidth) {
        grillaFrozen.parent().find('.frozen-div').hide();
        grillaFrozen.hide();
    } else {
        grillaFrozen.parent().find('.frozen-div').show();
        grillaFrozen.show();
    }

    grilla.setGridWidth(gridParentWidth);
}

function resizeAllGrids() {
    $('.ui-jqgrid-btable').each(function (t, tabla) {
        resizeGrid($(tabla).attr('id'));
    });
}

/*BaseUtils.recargarGrillaJQGrid = function(Auth,tableParams){
 if (Auth.authz.token) {
 Auth.authz.updateToken(5).success(function() {
 console.log('listo updateToken');
 tableParams.reloadGrid();
 }).error(function() {
 console.log('Failed to refresh token');
 });
 }
 }
 BaseUtils.agregarTokenJQGrid = function(Auth,jqXHR){
 jqXHR.setRequestHeader("Authorization",'Bearer ' + Auth.authz.token);
 }*/

BaseUtils.synchronousRequestRefreshToken = function (Auth) {
    if (BaseUtils.isTokenExpired(5)) {

        var response = {};
        try {
            var params = 'grant_type=refresh_token&' + 'refresh_token=' + Auth.authz.refreshToken;
            params += '&client_id=' + Auth.authz.clientId;
            var url = Auth.authz.authServerUrl + '/realms/' + Auth.authz.realm + '/protocol/openid-connect/token';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, false);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.send(params);

            if (xhr) {
                response.status = xhr.status;
                if (response.status == 200) {
                    var tokenResponse = JSON.parse(xhr.responseText);
                    Auth.authz.token = tokenResponse['access_token'];
                    Auth.authz.refreshToken = tokenResponse['refresh_token'];
                    window.ultimoRefreshToken = new Date().getTime() / 1000;
                } else {
                    throw Error("no se pudo refrescar el token");
                }
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    return true;
};

BaseUtils.isTokenExpired = function (minValidity) {

    var expiresIn = (new Date().getTime() / 1000) - window.ultimoRefreshToken;
    if (minValidity) {
        expiresIn -= minValidity * 60;
    } else {
        expiresIn -= 300; //5 minutos
    }

    return expiresIn >= 0;
};

BaseUtils.redirectError = function (estado) {
    if (estado == 401) {
        window.location = BaseUrl.error401403;
    } else if (estado == 403) {
        window.location = BaseUrl.error401403;
    }
};

BaseUtils.processResponse = function (responseIN) {

    var status = responseIN.status;
    var messages = [];

    if (!(responseIN instanceof Object) && responseIN == 'Failed to refresh token') {
        window.location = BaseUrl.baseBaseUrl;
    }

    if (typeof (responseIN.messages) != 'undefined') {
        if (responseIN.messages instanceof Array) {
            messages = responseIN.messages;
        } else {
            messages.push(responseIN.messages);
        }
    }

    if (typeof (responseIN.data) != 'undefined') {
        if (responseIN.data instanceof Object) {
            messages = responseIN.data.messages ? responseIN.data.messages : [];
        } else {
            messages.push(responseIN.data);
        }
    }

    var responseOUT = {};
    var detailMessage = {};
    responseOUT.data = {};

    detailMessage.showHeader = false;
    angular.forEach(messages, function (message) {
        if (/ORA/.test(message) || /SQL/.test(message) ||
            /RESTEASY/.test(message) || /java/.test(message) ||
            /<html/.test(message) || /org.apache/.test(message)) {
            detailMessage.header = 'Ha ocurrido un error inesperado. Consulte con soporte.';
            return (detailMessage.showHeader = true);
        }
    });

    responseOUT.status = status;
    messages = messages.length == 0 ? ['Ha ocurrido un error inesperado. Consulte con soporte.'] : messages;
    responseOUT.data.messages = {
        messages: messages,
        detailMessage: detailMessage
    };

    return responseOUT;
};