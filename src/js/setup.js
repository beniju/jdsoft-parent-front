var auth = {};
var puerto = '';
if (window.location.port != '') {
    puerto += ':' + window.location.port;
}
var urlRedirect = window.location.protocol + '//' + window.location.hostname + puerto + MasterUrl.baseMasterUrl;
auth.logoutUrl = urlRedirect;
MasterUrl.redirectToModule = window.location.protocol + '//' + window.location.hostname + puerto + MasterUrl.baseMasterUrl + MasterUrl.baseModuloUrl;

if (angular) {

    angular.bootstrap(document, ['master']);
} else {
    console.log('angular is undefined');
}