/**
 *  Utilitaria para manejo de Errores en el jqgrid
 */
var BaseJqgridUtils = {};

/**
 * Utilitaria para Manejo de acciones con respecto al DOM
 * @return {[type]} [description]
 */

BaseJqgridUtils.processResponseJqgrid = function (xhr, jqgridTable) {

    if (xhr.status === 404) {
        jqgridTable.clearGridData();
        return {
            status: xhr.status
        };
    }

    BaseUtils.redirectError(xhr.status);

    var response = {};
    if (typeof (xhr.responseJSON) == 'undefined') {
        response = {
            status: xhr.status,
            messages: [xhr.responseText]
        };
    } else {
        response = xhr.responseJSON;
    }

    return BaseUtils.processResponse(response);
};