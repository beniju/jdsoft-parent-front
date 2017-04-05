var auth = {};
var puerto = '';
if (window.location.port != '') {
    puerto += ':' + window.location.port;
}
var urlRedirect = window.location.protocol + '//' + window.location.hostname + puerto + BaseUrl.baseBaseUrl;
auth.logoutUrl = urlRedirect;
BaseUrl.redirectToModule = window.location.protocol + '//' + window.location.hostname + puerto + BaseUrl.baseBaseUrl + BaseUrl.baseModuloUrl;

if (angular) {

    angular.bootstrap(document, ['base']);
} else {
    console.log('angular is undefined');
}