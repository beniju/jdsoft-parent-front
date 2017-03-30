/**
 * Esta directiva se encarga de inicializar la tabla con jqGrid
 * <a href ="http://trirand.com/blog/jqgrid/jqgrid.html.</a>
 *
 * @class
 * @name master.directive.uiJqgrid
 * @author <>
 */


/**
 * Se inizializa el servicio  para el jqgrid.
 *
 * @constructor
 *
 */

angular.module('jqgrid', [])

.factory('serviciosjqgrid', function () {

    var serviciosjqgrid = function (baseParameters) {


        /**
         * Se guarda la configuracion para la tabla con jQGrid
         * @param   options EL objeto de Confuguracion
         * @return
         */
        this.parameters = function (options) {
            params = $.extend({}, params, options);
            this.$params = params;
            return this;
        }

        /**
         * Se le pasa el element de la tabla para su manejo desde el servicio
         * @param  {element} newSettings  el elemento de la tabla
         * @return
         */
        this.settings = function (newSettings) {
            if (angular.isDefined(newSettings)) {
                settings = angular.extend(settings, newSettings);
                return this;
            }
            return settings;
        };


        /**
         * Confguracion inicial de nuestra tabla una vez obtenido todos los parametros de Configuracion
         * @param   parametros [Parametros de configuracion ]
         * @return
         */
        this.configureGrid = function (parametros) {

            $('#' + settings.$element.attr('id')).jqGrid('GridUnload');

            this.parameters(parametros);

            $('#' + settings.$element.attr('id')).jqGrid(params);
            //  settings.$element.jqGrid(params);
            $('#' + settings.$element.attr('id')).jqGrid('navGrid', params.pager, {
                search: false,
                edit: false,
                add: false,
                del: false
            });
            // settings.$element.jqGrid('setFrozenColumns');

            gridId = settings.$element.attr('id');
            $(window).resize(function () {
                resizeAllGrids();
                //resizeGrid(gridId);
            });
            resizeGrid(gridId);

        };


        /**
         * Vuelve a cargar la Tabla con la configuración actual.
         * Esto significa que una nueva solicitud se envía al servidor si el tipo de datos es xml o json.                          *
         */
        this.reloadGrid = function () {
            $('#' + settings.$element.attr('id')).jqGrid().trigger("reloadGrid");
        };

        /**
         * Establece un parámetro en particular.
         * Nota - para que algunos parámetros surtan efecto un se ejecutar un evento ("reloadGrid")
         * Tenga en cuenta que con este método podemos ignorar eventos.
         * El nombre (en el par nombre: valor) es el nombre del array de opciones.
         * Durante opciones particulares, ver las opciones. http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options

         * @param param
         */
        this.setGridParam = function (param) {
            $('#' + settings.$element.attr('id')).jqGrid('setGridParam', param);
        };

        /**
         * Devuelve el valor de los parámetros deseados.
         *  param es el nombre del array de opciones.
         *  Si el nombre no está definida, se devuelven las opciones de entrada.
         *  Para las opciones disponibles, consulte Opciones.http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
         *  @param   param
         *
         */
        this.getGridParam = function (param) {
            var param = $('#' + settings.$element.attr('id')).jqGrid('getGridParam', param);
            return param;

        };

        /**
         * Establece un parámetro en particular.
         * Nota - para que algunos parámetros surtan efecto un se ejecutar un evento ("reloadGrid")
         * Tenga en cuenta que con este método podemos ignorar eventos.
         * El nombre (en el par nombre: valor) es el nombre del array de opciones.
         * Durante opciones particulares, ver las opciones. http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options

         * @param param
         */
        this.setFooterParam = function (param) {
            var celda = $('#' + settings.$element.attr('id')).jqGrid('footerData', 'set', param);
            return celda;

        };

        /**
         * Devuelve el valor de los parámetros deseados.
         *  param es el nombre del array de opciones.
         *  Si el nombre no está definida, se devuelven las opciones de entrada.
         *  Para las opciones disponibles, consulte Opciones.http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
         *  @param   param
         *
         */
        this.getFooterParam = function (param) {
            var celda = $('#' + settings.$element.attr('id')).jqGrid('footerData', 'get', param);
            return celda;

        };

        /**
         * Devuelve una array con los datos del id = rowid solicitado.
         * Si no se le pasa el id devuelve un array con  todos los datos de la Tabla
         * El array  devuelto es del tipo name:value ,
         * donde el nombre es un nombre de colModel y el valor de la columna asociada en esa fila.
         * Devuelve un array vacía si el rowid no se puede encontrar.
         * No utilice este método cuando se edita la fila o celda.
         * Esto devolverá el contenido de la celda y no el valor actuall de la entrada element.
         * Si el rowid no se establece el método de devolver todos los datos de la red en serie

         * @param  {[type]} idRow [description]
         * @return {[type]}       [description]
         */
        this.getRowData = function (idRow) {
            var rowData = $('#' + settings.$element.attr('id')).jqGrid('getRowData', idRow);
            return rowData;
        };


        /**
         * Metodo que devuelve el row inicio a paratir de la pagina actual
         *
         * @return {[type]} [description]
         */
        this.getRowsStart = function () {
            var pagina = this.getGridParam("page");
            var inicio = ((pagina - 1) < 0 ? 0 : pagina - 1) * this.getGridParam("rowNum");
            return inicio;
        };

        /**
         * Cambia una selección de la fila con id = rowid; si onselectrow es true (valor predeterminado),
         * entonces el evento onSelectRow se lanza, de lo contrario no .
         * @param {[key]} rowid
         * @param {[boolean]} onselectrow
         */
        this.setSelection = function (rowid, onselectrow) {
            $('#' + settings.$element.attr('id')).jqGrid().setSelection(rowid, onselectrow);

        };


        /**Nuevos a probar**/


        /**
         * Este método devuelve un array  de los identificadores en la Tabla Actual
         * Devuelve una array vacío si no hay datos disponibles.
         * @return {[array[]]}
         */
        this.getDataIDs = function () {
            var array = $('#' + settings.$element.attr('id')).jqGrid().getDataIDs();
            return array;

        };

        /**
         * Restablece (anula la selección) de la fila seleccionada (s).
         *  También funciona en el modo de selección múltiple.
         * @return {[type]} [description]
         */
        this.resetSelection = function () {
            var array = $('#' + settings.$element.attr('id')).jqGrid().resetSelection();

        };

        /**
         * Restaura los datos a los valores originales antes de la edición de la fila especificada por rowid.
         * @param  {[key]} rowid
         *
         */
        this.restoreRow = function (rowid) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().restoreRow(rowid);

        };

        /**
         * Devuelve el contenido de la celda especificada por id = rowid y columna = iCol.
         * iCol puede ser o bien el índice de la columna o el nombre especificado en colModel.
         * No utilice este método cuando se edita la fila o celda.
         * Esto devolverá el contenido de la celda y no el valor actuall del elemento de entrada
         * @param  {[type]} rowid
         * @param  {[type]} iCol
         * @return
         */
        this.getCell = function (rowid, iCol) {
            var celda = $('#' + settings.$element.attr('id')).jqGrid().getCell(rowid, iCol);
            return celda;

        };

        /**
         * Inserta una nueva fila con id = rowid que contiene los datos de los datos (un objeto) en la posición especificada
         * (primero en la tabla, último de la tabla, o antes o después de la fila especificada en srcrowid).
         * La sintaxis del objeto de data es: {nombre1: valor1, nombre2: valor2 ...}
         * donde nombre es el nombre de la columna como se describe en el colModel y el valor es el valor.
         *  Este método se puede insertar varias filas a la vez.
         *  En este caso el parámetro de datos debe ser definido como array [{nombre1: valor1, nombre2: valor2 ...}, {nombre1: valor1, nombre2: valor2 ...}]
         *
         * @param {[type]} rowid
         * @param {[type]} data
         * @param {[type]} position
         * @param {[type]} srcrowid
         */
        this.addRowData = function (rowid, data, position, srcrowid) {

            $('#' + settings.$element.attr('id')).jqGrid().addRowData(rowid, data, position, srcrowid);

        };

        /**
         * Guarda la fila especificada por rowid,
         * después de que se ha abierto en el modo de  ediciónpor el método editRow.
         * @param  {[type]}   rowid       [description]
         * @param  {Function} callback    [es una función llamada después de que el almacenamiento se haya completado.La función acepta un objeto XMLHttpRequest con la respuesta del servidor]
         * @param  {[type]}   url         [es la URL que se utiliza para enviar los valores. Si se especifica,este valor prevalece sobre el valor especificado por la opción editurl.]
         * @param  {[type]}   extraparams [on parámetros adicionales que se pasan al servidor.Los datos se publica en forma de id = rowid & name = valor ..., donde el nombre es el "nombre" de colModel.]
         * @param  {[type]}   aftersavefunc [Función que es invocada cuando se termina la invocación del saveRow]
         * @return {[type]}               [description]
         */
        this.saveRow = function (rowid, callback, url, extraparams, aftersavefunc) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().saveRow(rowid, callback, url, extraparams, aftersavefunc);

        };

        /**
         * Borra los datos cargados actualmente en la tabla.
         * @param  {[type]} clearfooter [ Si el parámetro clearfooter se establece en true, el método borra los datos que se colocan en la fila de pie de página.]
         * @return {[type]}             [description]
         */
        this.clearGridData = function (clearfooter) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().clearGridData(clearfooter);

        };

        /**
         * Elimina la fila con el id = rowid. Esta operación no borra los datos del servidor.
         * @param  {[type]} rowid [id]
         * @return {[type]}       [description]
         */
        this.delRowData = function (rowid) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().delRowData(rowid);

        };

        this.bindKeys = function (param) {
            $('#' + settings.$element.attr('id')).jqGrid('bindKeys', param);
        };
        /*editparameters = {
         "keys" : false,
         "oneditfunc" : null,
         "successfunc" : null,
         "url" : null,
         "extraparam" : {},
         "aftersavefunc" : null,
         "errorfunc": null,
         "afterrestorefunc" : null,
         "restoreAfterError" : true,
         "mtype" : "POST"
         }*/

        /**
         * Edita la fila especificada por rowid.
         * keys  es un valor booleano, que indica si usar la tecla Intro para aceptar el valor ane Esc para cancelar la edición, o no.
         * @param  {[type]} rowid          [id]
         * @param  {[type]} editparameters [parametros definidos ariba en editparameters ]
         * @param  {[type]}   aftersavefunc [Función que es invocada cuando se termina la invocación del editRow]
         * @return {[type]}                [description]
         */
        this.editRow = function (rowid, editparameters, aftersavefunc) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().editRow(rowid, editparameters, null, null, null, null, aftersavefunc);

        }


        /**
         * Este método devuelve un array con los valores de la columna.
         *   Si este parámetro se establece y es válido, el valor devuelto es un escalar que representa la operación que se aplica a todos los valores de la columna. Si el parámetro no es válido el valor devuelto es una matriz vacía

         * @param  {[type]} colname       [colname puede ser un número que representa el índice de la columna o un nombre de colMode]
         * @param  {[type]} returntype    [ determina el tipo de la matriz devuelta. Cuando se establece en false (predeterminado)
         *                                la matriz contiene sólo los valores. Cuando se establece en true la matriz contiene un conjunto de objetos.
         *                                   El objeto se define como {id: rowid, valor: CellValue} donde el rowid es el id de la fila
         *                                   y CellValue es el valor de la celda. Por ejemplo, dicha salida puede ser [{id: 1, valor: 1}, {id: 2, valor: 2} ...]
         ]
         * @param  {[type]} mathoperation [Las opciones válidas para mathoperation son - 'sum, 'avg', 'count'.
         *                                 Si este parámetro se establece y es válido,
         *                                 el valor devuelto es un escalar que representa la operación que se aplica a todos los valores de la columna.
         *                                 Si el parámetro no es válido el valor devuelto es una aray vacío
         ]
         * @return
         */
        this.getCol = function (colname, returntype, mathoperation) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().getCol(colname, returntype, mathoperation);
            return array;

        };

        /**
         * Devuelve los datos de fila de la array local almacenado en el parámetro de datos cuando el tipo de datos es local
         * @param  {[type]} rowid [id]
         * @return {[type]}       [description]
         */
        this.getLocalRow = function (rowid) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().getCol(rowid);

        };


        /**
         * Este método puede cambiar el contenido de una celda  en particular y puede configurar la clase o tipo de propiedades.
         *  datos del contenido que se puede poner en la célula Si cadena vacía el contenido no lo hará. cambiar de clase si la clase es una cadena y luego le añadimos una clase a la celda utilizando addClass; si la clase es una matriz establecemos las nuevas propiedades CSS a través de las propiedades CSS establece los Properies atributos de la célula, forceup Si el parámetro se establece en true realizamos actualización de la celda en lugar de que el valor está vacía

         * @param {[type]} rowid      [rowid el id de la fila]
         * @param {[type]} colname    [el nombre de la columna (este parámetro puede ser un número (el índice de la columna)comenzando desde 0 ]
         * @param {[type]} data       [el contenido que se puede poner en la celda. Si cadena vacía el contenido no se cambiará]
         * @param {[type]} clase      [si la clase es una cadena a continuación, añadimos una clase a la celda utilizando addClass;
         *                                si la clase es una matriz establecemos las nuevas propiedades CSS a través de css]
         * @param {[type]} properties [establece los Properies atributos de la celda]
         * @param {[type]} forceup    [Si el parámetro se establece en true realizamos la actualización de la celda en lugar de que el valor está vacío]
         */

        this.setCell = function (rowid, colname, data, clase, properties, forceup) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().setCell(rowid, colname, data, clase, properties, forceup);

        };

        /**
         * Funcion que permite ocultar o mostrar una columna.
         * @param colName [nombre de la columna, atributo name del colModel]
         * @param hidden  [Si hidden se establece en true se oculta la columna, de lo contrario se muestra]
         */
        this.setColHidden = function (colName, hidden) {
            if (hidden) {
                $('#' + settings.$element.attr('id')).jqGrid().hideCol(colName);
            } else {
                $('#' + settings.$element.attr('id')).jqGrid().showCol(colName);
            }
        };

        /**
         * Actualiza los valores (utilizando el array de datos) en la fila con rowid.
         *  La sintaxis del array de datos es: {nombre1: valor1, nombre2: valor2 ...} donde el nombre es el nombre de la columna
         *  como se describe en el colModel y el valor es el valor nuevo.
         *  Si el parámetro es una cadena cssprop usamos addClass añadir clases a la fila.
         *  Si el parámetro es objeto usamos CSS para agregar propiedades css.
         *  Tenga en cuenta que podemos establecer las propiedades y clases sin datos,
         *  en este caso debemos establecer datos falsos
         *  No use este método cuando se edita la fila o celda.
         *  Esto establecerá el contenido y sobrescribir los elementos de entrada.

         * @param {[type]} rowid   [description]
         * @param {[type]} data    [description]
         * @param {[type]} cssprop [usamos addClass añadir clases a la fila. ]
         */
        this.setRowData = function (rowid, data, cssprop) {
            var array = $('#' + settings.$element.attr('id')).jqGrid().setRowData(rowid, data, cssprop);

        };


        /**
         * Manejo de subgrillas ############################################################################
         */

        /**
         * Metodo que nos ayuda a crear Subgrillas
         * @param  {[type]} subgrid_id   [id de la subgrilla]
         * @param  {[type]} row_id       [id de la fila a la cual se asiciará la subgrilla]
         * @param  {[type]} pager_id     [el id del pager si es que se utilizara]
         * @param  {[type]} subGridParam [configuracion de la subgrilla]
         */
        this.createSubgrid = function (subgrid_id, row_id, pager_id, subGridParam) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";

            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' ui-jqgrid='subgrillasParam' class='table table-hover table-bordered' role='grid'></table ><div id='" + pager_id + "' class='scroll'></div>");
            settings.$subgridElement = $("#" + subgrid_table_id);
            $("#" + subgrid_table_id).jqGrid(subGridParam);


        };

        /**
         *
         * Devuelve el valor de los parámetros deseados.
         *  param es el nombre del array de opciones.
         *  Si el nombre no está definida, se devuelven las opciones de entrada.
         *  Para las opciones disponibles, consulte Opciones.http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
         *  @param   param
         *
         */


        this.getSubGridParam = function (param) {
            var param = $('#' + settings.$subgridElement.attr('id')).jqGrid('getGridParam', param);
            return param;

        };

        /**
         * Metodo que devuelve el row inicio a paratir de la pagina actual
         *
         * @return {[type]} [description]
         */

        this.getSubGridRowsStart = function () {
            var pagina = this.getSubGridParam("page");
            var inicio = ((pagina - 1) < 0 ? 0 : pagina - 1) * this.getSubGridParam("rowNum");
            return inicio;
        };
        /**
         * Metodo que elimina la subgrilla actual
         * @return {[type]} [description]
         */
        this.deleteSubGrid = function () {
            settings.$subgridElement = null;
        };

        /**
         * Establece un parámetro en particular.
         * Nota - para que algunos parámetros surtan efecto un se ejecutar un evento ("reloadGrid")
         * Tenga en cuenta que con este método podemos ignorar eventos.
         * El nombre (en el par nombre: valor) es el nombre del array de opciones.
         * Durante opciones particulares, ver las opciones. http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options

         * @param param
         */
        this.setSubGridParam = function (param) {
            settings.$subgridElement.jqGrid('setGridParam', param);
        };

        /**
         * Setea un nuevo ancho para la grilla.
         *
         * @param {Integer} new_width
         * @param {Boolean} shrink valor para la opcion shrinkToFit.
         * Ver las opciones. http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
         */
        this.setGridWidth = function (new_width, shrink) {
            if (!shrink) {
                shrink = true;
            }

            $('#' + settings.$element.attr('id')).setGridWidth(new_width, shrink);

        };

        /**
         * Obtiene el ancho de la grilla
         * @return {Integer} Ancho actual de la grilla
         */
        this.getGridWidth = function () {
            return $('#' + settings.$element.attr('id')).getGridWidth();
        };

        /**
         * Setea propiedades del colModel para una columna especifica
         * @param {String} colname Nombre de la columna
         * @param {Map<String,Object>} properties description
         */
        this.setColProp = function (colname, properties) {
            $('#' + settings.$element.attr('id')).setColProp(colname, properties);
        };

        /**
         * Obtiene las propiedades de una columna dada
         * @param {String} colname
         * @returns {array{}} Las propiedades de la columna
         * @see getColProp http://www.trirand.com/jqgridwiki/doku.php?id=wiki:methods
         */
        this.getColProp = function (colname) {
            return $('#' + settings.$element.attr('id')).getColProp(colname);
        };


        var params = this.$params = {
            rowNum: 5,
            pager: '#pager2',
            viewrecords: true,
            loadonce: false,
            rownumbers: true,
            datatype: "json"
        };

        var settings = {
            $element: null,
            $subgridElement: null

        };

        this.parameters(baseParameters);

        return this;

    };

    return serviciosjqgrid;
})


/**
 * [Se regustra la directiva uiJqgrid en nuestro modulo]
 */
.directive('uiJqgrid', function ($compile, serviciosjqgrid) {
    return {

        restrict: 'A',
        priority: 1001,
        scope: false,

        compile: function (element) {


            return function (scope, element, attrs) {

                //~ se obtiene el nombre del model asociado a la directiva
                //~ se hace watch del atributo sobre el modelo 
                scope.$watch(attrs.uiJqgrid, (function (params) {
                    if (angular.isUndefined(params)) {
                        return;
                    }
                    scope.params = params;
                    scope.params.settings({
                        $element: element
                    });

                }), true);


                //~ se hace watch del atributo param(parametro de Configuraion del jqGrid)
                scope.$watch('params.$params', function (params) {
                    if (angular.isUndefined(params)) {
                        return;
                    }
                    scope.params.configureGrid(params);


                }, true);

            };
        }



    };
})