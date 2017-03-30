/**
 *  Utilitaria para manejo de Errores en el jqgrid
 */
var MasterJqgridUtils = {};

/**
 * Utilitaria para Manejo de acciones con respecto al DOM
 * @return {[type]} [description]
 */

MasterJqgridUtils.processResponseJqgrid = function (xhr, jqgridTable) {

    if (xhr.status === 404) {
        jqgridTable.clearGridData();
        return {
            status: xhr.status
        };
    }

    MasterUtils.redirectError(xhr.status);

    var response = {};
    if (typeof (xhr.responseJSON) == 'undefined') {
        response = {
            status: xhr.status,
            messages: [xhr.responseText]
        };
    } else {
        response = xhr.responseJSON;
    }

    return MasterUtils.processResponse(response);
};