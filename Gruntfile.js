/**
 *Minimize del frontend
 * 1) html-minify
 * 2) uglify
 * 3) min css, unificar los css
 * 4) concatenar los libs principales
 * 5) Eliminar archivos inecesarios.
 */
var BaseDir = 'dist/base';
var BaseTmpDir = BaseDir + '/tmp';
var appPath = '/base';
var puerto = 9875;
var pwd = "src/";

//Producción:
var urlBase = 'http://localhost:' + puerto;
var urlDigi = 'http://192.168.1.7';

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Se encarga de copiar los archivos estaticos al directorio dist.
         */
        copy: {
            main: {
                files: [
                    {
                        cwd: pwd,
                        src: ['*.{html,json}'],
                        dest: BaseDir,
                        expand: true
                    },
                    {
                        cwd: pwd + 'css',
                        src: ['*.{png,gif}'],
                        dest: BaseDir + '/css',
                        expand: true
                    },
                    {
                        cwd: pwd + 'css/new',
                        src: ['*.css'],
                        dest: BaseDir + '/css/new',
                        expand: true
                    },
                    {
                        cwd: pwd + 'css/fonts',
                        src: ['*'],
                        dest: BaseDir + '/css/fonts',
                        expand: true
                    },
                    {
                        cwd: pwd + 'img',
                        src: '**/*',
                        dest: BaseDir + '/img',
                        expand: true
                    },
                    {
                        cwd: pwd + 'lib',
                        src: '**/*',
                        dest: BaseTmpDir + '/lib',
                        expand: true
                    },
                    {
                        cwd: pwd + 'partials',
                        src: '**/*',
                        dest: BaseDir + '/partials',
                        expand: true
                    },
                    {
                        cwd: pwd + 'fonts',
                        src: '**/*',
                        dest: BaseDir + '/fonts',
                        expand: true
                    },
                    {
                        cwd: pwd + 'lib/file-reader',
                        src: ['*.swf'],
                        dest: BaseDir + '/lib/file-reader',
                        expand: true
                    },
                    {
                        cwd: pwd + 'lib/file-upload',
                        src: ['*.swf'],
                        dest: BaseDir + '/lib/file-upload',
                        expand: true
                    },
                    {
                        cwd: pwd + 'js/directives/template',
                        src: ['**/*'],
                        dest: BaseDir + '/js/template',
                        expand: true
                    },
                    {
                        cwd: pwd + 'module',
                        src: ['*.{html,md}'],
                        dest: BaseDir + '/module',
                        expand: true
                    }
                ]
            },
            local: {
                files: [{
                    cwd: pwd + 'js',
                    src: ['**/*js'],
                    dest: BaseTmpDir + '/js',
                    expand: true
                }]
            },
            generate_dist: {
                files: [{
                    cwd: 'dist',
                    src: ['**'],
                    dest: '../dist-base',
                    expand: true
                }]
            }
        },

        /**
         * Se encarga de concatenar los archivos js que pasan en el array de src.
         */
        concat: {
            options: {
                separator: ';'
            },
            third_party_libs: {
                src: [
                    /*lib de terceros*/
                    BaseTmpDir + '/lib/jquery/jquery.min.js',
                    BaseTmpDir + '/lib/jquery/jquery.jqgrid.min.js',
                    BaseTmpDir + '/lib/jquery/jquery.bootstrap.wizard.js',
                    BaseTmpDir + '/lib/jquery/jquery-ui-1.9.2.custom.min.js',
                    BaseTmpDir + '/lib/jquery/blockUI.js',
                    BaseTmpDir + '/lib/jquery/jquery.bootstrap-duallistbox.min.js',
                    BaseTmpDir + '/lib/jquery/grid.locale-es.js',
                    BaseTmpDir + '/lib/pace/pace.min.js',

                    BaseTmpDir + '/lib/select2/select2.js',
                    BaseTmpDir + '/lib/select2/select2_locale_es.js',

                    BaseTmpDir + '/lib/angular/angular.min.js',
                    BaseTmpDir + '/lib/angular/angular.animate.min.js',
                    BaseTmpDir + '/lib/angular/angular.cookies.min.js',
                    BaseTmpDir + '/lib/angular/angular-locale-es.js',
                    BaseTmpDir + '/lib/angular/angular-resource.js',
                    BaseTmpDir + '/lib/angular/angular-route.js',
                    BaseTmpDir + '/lib/angular/angular.sanitize.min.js',

                    BaseTmpDir + '/lib/bootstrap/bootstrap.min.js',
                    BaseTmpDir + '/lib/bootstrap/bootstrap-combobox.js',
                    BaseTmpDir + '/lib/bootstrap/bootstrap-datepicker-es.js',
                    BaseTmpDir + '/lib/date/date.js',
                    BaseTmpDir + '/lib/date/es-PY.js',
                    BaseTmpDir + '/lib/file-reader/jquery.FileReader.js',
                    BaseTmpDir + '/lib/file-reader/swfobject.js',
                    BaseTmpDir + '/lib/file-reader/uiFileReader.min.js',
                    BaseTmpDir + '/lib/file-upload/FileAPI.min.js',
                    BaseTmpDir + '/lib/file-reader/bootstrap-file-upload.min.js',
                    BaseTmpDir + '/lib/file-upload/angular-file-upload-shim.min.js',
                    BaseTmpDir + '/lib/jquery-placeholder/jquery.jquery-placeholder.js',
                    BaseTmpDir + '/lib/keycloak/keycloak.js',
                    BaseTmpDir + '/lib/modernizr/modernizr.custom.05679.js',
                    BaseTmpDir + '/lib/pattern-input/pattern-input.js',
                    BaseTmpDir + '/lib/objectpath/ObjectPath.js',
                    BaseTmpDir + '/lib/tv4/tv4.js'


                ],
                dest: BaseDir + '/js/third-party-libs.js'
            },
            librerias: {
                src: [
                    /*Helpers e inicializadores globales*/
                    BaseTmpDir + '/js/helpers/position.js',
                    BaseTmpDir + '/js/helpers/bindHtml.js',

                    BaseTmpDir + '/js/directives/directivas-bases/ui-formater-inputs.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-event-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-tooltip-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-modal-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/breadcrumb-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-alert-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-blockui-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-jqgrid-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-wizar-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-select2-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-dropdown-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-timepicker-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/validation-number-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/validation-regla-negocio-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-focusme-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-datetimepicker.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-duallistbox.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-file-reader.js',
                    BaseTmpDir + '/js/directives/directivas-bases/dynamic-controller-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/ui-pattern-input-directive.js',
                    BaseTmpDir + '/js/directives/directivas-bases/checklist-model.js',
                    BaseTmpDir + '/js/directives/directivas-opcionales/ui-switch.js',
                    BaseTmpDir + '/js/directives/directivas-bases/schema-form.js',
                    BaseTmpDir + '/js/directives/ui-module-directive.js',
                    BaseTmpDir + '/js/filters/filters-module.js',

                    /*Services*/
                    BaseTmpDir + '/js/services/route-resolver.js',
                    BaseTmpDir + '/js/services/auth-service.js',
                    BaseTmpDir + '/js/services/synchronous-request-services.js',

                    /*Directivas propias*/
                    BaseTmpDir + '/js/helpers/jqgridUtils.js',
                    BaseTmpDir + '/js/helpers/dialogs.js'

                ],

                dest: BaseTmpDir + '/js/libs.js'

            },
            own_libs: {
                src: [
                    BaseTmpDir + '/js/helpers/appUtilsHost.js',
                    BaseTmpDir + '/js/libs.js',
                ],

                dest: BaseDir + '/js/own-libs.js'

            },
            common_components: {
                src: [
                    BaseTmpDir + '/js/main-module-register.js',

                    /*Controladores base*/
                    BaseTmpDir + '/js/controllers/*.js',
                    BaseTmpDir + '/js/controllers/**/**/*.js',
                    BaseTmpDir + '/js/controllers/**/*.js'

                ],

                dest: BaseDir + '/js/common-components.js'

            },
            parent_app: {
                src: [
                    BaseTmpDir + '/js/app.js',
                    BaseTmpDir + '/js/setup.js'
                ],
                dest: BaseDir + '/js/main.js'
            },
            actions: {
                src: [
                    BaseTmpDir + '/js/actions.js',

                ],
                dest: BaseDir + '/js/actions.js'

            },
            plugins: {
                src: [
                    BaseTmpDir + '/js/plugins.js'
                ],
                dest: BaseDir + '/js/plugins.js'
            }
        },

        clean: {
            options: {
                force: true,
                trace: true
            },
            dist: ['dist'],
            tmpDir: [BaseTmpDir]
        },


        /**
         * Unifica y minimiza los archivos css que se encuentran en css
         * y copia al directorio dist/css
         */
        'css-include-combine': {
            'libs': {
                relativeDir: pwd + 'css',
                main: pwd + 'css/style.css',
                out: BaseDir + '/css/style.css'
            },
            'theme-default': {
                relativeDir: pwd + 'css',
                main: pwd + 'css/theme-default.css',
                out: BaseDir + '/css/theme-default.css'
            },
            'pace': {
                relativeDir: pwd + 'css/pace',
                main: pwd + 'css/pace/pace.css',
                out: BaseDir + '/css/pace/pace.css'
            }
        },


        /**
         *
         */
        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: pwd + 'js',
                    src: '**/*js',
                    dest: BaseTmpDir + '/js',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },

        // levantamos la aplicación

        /**
         * Levanta la aplicación en un servidor propio de desarrollo. Ya define las
         * reglas de proxy para los servicios REST.
         */
        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    port: puerto,
                    base: ".." + appPath + "/dist",
                    livereload: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        console.log(proxy)
                        return [proxy].concat(defaultMiddleware);
                    }
                },
                proxies: [{
                    context: '/digi/tanque-m3',
                    host: 'localhost',
                    port: 8080,
                    headers: {
                        'host': 'localhost'
                    }
                }]
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'urlBase',
                            replacement: urlBase
                        },
                        {
                            match: 'urlDigi',
                            replacement: urlDigi
                        }
                    ]
                },
                files: [{
                    src: [BaseTmpDir + '/js/helpers/appUtils.js'],
                    dest: BaseTmpDir + '/js/helpers/appUtilsHost.js'
                }]
            }
        },

        /**
         * Abre una pestaña en el navegador con la url al proyecto
         */
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:' + puerto + appPath
            }
        },
        watch: {},


    });

    grunt.loadNpmTasks('grunt-css-include-combine');
    grunt.registerTask('default', ['build']);
    grunt.registerTask('concatLocal', [
        'concat:third_party_libs',
        'concat:librerias',
        'concat:own_libs',
        'concat:common_components',
        'concat:parent_app',
        'concat:actions',
        'concat:plugins'
    ]);
    /*Comandos a ejecutar desde consola*/
    grunt.registerTask('deploy', ['uglify', 'css-include-combine', 'copy:main', 'replace:dist', 'concatLocal', 'clean:tmpDir']);
    grunt.registerTask('build', ['copy:local', 'css-include-combine', 'copy:main', 'replace:dist', 'concatLocal', 'clean:tmpDir']);
    grunt.registerTask('server', ['build', 'configureProxies:server', "open", 'connect:server', 'watch']);
    grunt.registerTask('reset', ['clean:dist']);
};