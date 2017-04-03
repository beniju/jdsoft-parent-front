/**
 *Minimize del frontend
 * 1) html-minify
 * 2) uglify
 * 3) min css, unificar los css
 * 4) concatenar los libs principales
 * 5) Eliminar archivos inecesarios.
 */
var MasterDir = 'dist/master';
var MasterTmpDir = MasterDir + '/tmp';
var appPath = '/master';
var puerto = 9875;
var pwd = "src/";

//Producción:
var urlMaster = 'http://localhost:' + puerto;
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
                        dest: MasterDir,
                        expand: true
                    },
                    {
                        cwd: pwd + 'css',
                        src: ['*.{png,gif}'],
                        dest: MasterDir + '/css',
                        expand: true
                    },
                    {
                        cwd: pwd + 'css/new',
                        src: ['*.css'],
                        dest: MasterDir + '/css/new',
                        expand: true
                    },
                    {
                        cwd: pwd + 'img',
                        src: '**/*',
                        dest: MasterDir + '/img',
                        expand: true
                    },
                    {
                        cwd: pwd + 'lib',
                        src: '**/*',
                        dest: MasterTmpDir + '/lib',
                        expand: true
                    },
                    {
                        cwd: pwd + 'partials',
                        src: '**/*',
                        dest: MasterDir + '/partials',
                        expand: true
                    },
                    {
                        cwd: pwd + 'fonts',
                        src: '**/*',
                        dest: MasterDir + '/fonts',
                        expand: true
                    },
                    {
                        cwd: pwd + 'lib/file-reader',
                        src: ['*.swf'],
                        dest: MasterDir + '/lib/file-reader',
                        expand: true
                    },
                    {
                        cwd: pwd + 'lib/file-upload',
                        src: ['*.swf'],
                        dest: MasterDir + '/lib/file-upload',
                        expand: true
                    },
                    {
                        cwd: pwd + 'js/directives/template',
                        src: ['**/*'],
                        dest: MasterDir + '/js/template',
                        expand: true
                    },
                    {
                        cwd: pwd + 'module',
                        src: ['*.{html,md}'],
                        dest: MasterDir + '/module',
                        expand: true
                    }
                ]
            },
            local: {
                files: [{
                    cwd: pwd + 'js',
                    src: ['**/*js'],
                    dest: MasterTmpDir + '/js',
                    expand: true
                }]
            },
            generate_dist: {
                files: [{
                    cwd: 'dist',
                    src: ['**'],
                    dest: '../dist-master',
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
                    MasterTmpDir + '/lib/jquery/jquery.min.js',
                    MasterTmpDir + '/lib/jquery/jquery.jqgrid.min.js',
                    MasterTmpDir + '/lib/jquery/jquery.bootstrap.wizard.js',
                    MasterTmpDir + '/lib/jquery/jquery-ui-1.9.2.custom.min.js',
                    MasterTmpDir + '/lib/jquery/blockUI.js',
                    MasterTmpDir + '/lib/jquery/jquery.bootstrap-duallistbox.min.js',
                    MasterTmpDir + '/lib/jquery/grid.locale-es.js',
                    MasterTmpDir + '/lib/pace/pace.min.js',

                    MasterTmpDir + '/lib/select2/select2.js',
                    MasterTmpDir + '/lib/select2/select2_locale_es.js',

                    MasterTmpDir + '/lib/angular/angular.min.js',
                    MasterTmpDir + '/lib/angular/angular.animate.min.js',
                    MasterTmpDir + '/lib/angular/angular.cookies.min.js',
                    MasterTmpDir + '/lib/angular/angular-locale-es.js',
                    MasterTmpDir + '/lib/angular/angular-resource.js',
                    MasterTmpDir + '/lib/angular/angular-route.js',
                    MasterTmpDir + '/lib/angular/angular.sanitize.min.js',

                    MasterTmpDir + '/lib/bootstrap/bootstrap.min.js',
                    MasterTmpDir + '/lib/bootstrap/bootstrap-combobox.js',
                    MasterTmpDir + '/lib/bootstrap/bootstrap-datepicker-es.js',
                    MasterTmpDir + '/lib/date/date.js',
                    MasterTmpDir + '/lib/date/es-PY.js',
                    MasterTmpDir + '/lib/file-reader/jquery.FileReader.js',
                    MasterTmpDir + '/lib/file-reader/swfobject.js',
                    MasterTmpDir + '/lib/file-reader/uiFileReader.min.js',
                    MasterTmpDir + '/lib/file-upload/FileAPI.min.js',
                    MasterTmpDir + '/lib/file-reader/bootstrap-file-upload.min.js',
                    MasterTmpDir + '/lib/file-upload/angular-file-upload-shim.min.js',
                    MasterTmpDir + '/lib/jquery-placeholder/jquery.jquery-placeholder.js',
                    MasterTmpDir + '/lib/keycloak/keycloak.js',
                    MasterTmpDir + '/lib/modernizr/modernizr.custom.05679.js',
                    MasterTmpDir + '/lib/pattern-input/pattern-input.js',
                    MasterTmpDir + '/lib/objectpath/ObjectPath.js',
                    MasterTmpDir + '/lib/tv4/tv4.js'


                ],
                dest: MasterDir + '/js/third-party-libs.js'
            },
            librerias: {
                src: [
                    /*Helpers e inicializadores globales*/
                    MasterTmpDir + '/js/helpers/position.js',
                    MasterTmpDir + '/js/helpers/bindHtml.js',

                    MasterTmpDir + '/js/directives/directivas-bases/ui-formater-inputs.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-event-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-tooltip-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-modal-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/breadcrumb-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-alert-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-blockui-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-jqgrid-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-wizar-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-select2-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-dropdown-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-timepicker-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/validation-number-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/validation-regla-negocio-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-focusme-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-datetimepicker.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-duallistbox.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-file-reader.js',
                    MasterTmpDir + '/js/directives/directivas-bases/dynamic-controller-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/ui-pattern-input-directive.js',
                    MasterTmpDir + '/js/directives/directivas-bases/checklist-model.js',
                    MasterTmpDir + '/js/directives/directivas-opcionales/ui-switch.js',
                    MasterTmpDir + '/js/directives/directivas-bases/schema-form.js',
                    MasterTmpDir + '/js/directives/ui-module-directive.js',
                    MasterTmpDir + '/js/filters/filters-module.js',

                    /*Services*/
                    MasterTmpDir + '/js/services/route-resolver.js',
                    MasterTmpDir + '/js/services/auth-service.js',
                    MasterTmpDir + '/js/services/synchronous-request-services.js',

                    /*Directivas propias*/
                    MasterTmpDir + '/js/helpers/jqgridUtils.js',
                    MasterTmpDir + '/js/helpers/dialogs.js'

                ],

                dest: MasterTmpDir + '/js/libs.js'

            },
            own_libs: {
                src: [
                    MasterTmpDir + '/js/helpers/appUtilsHost.js',
                    MasterTmpDir + '/js/libs.js',
                ],

                dest: MasterDir + '/js/own-libs.js'

            },
            common_components: {
                src: [
                    MasterTmpDir + '/js/main-module-register.js',

                    /*Controladores base*/
                    MasterTmpDir + '/js/controllers/*.js',
                    MasterTmpDir + '/js/controllers/**/**/*.js',
                    MasterTmpDir + '/js/controllers/**/*.js'

                ],

                dest: MasterDir + '/js/common-components.js'

            },
            parent_app: {
                src: [
                    MasterTmpDir + '/js/app.js',
                    MasterTmpDir + '/js/setup.js'
                ],
                dest: MasterDir + '/js/main.js'
            },
            actions: {
                src: [
                    MasterTmpDir + '/js/actions.js',

                ],
                dest: MasterDir + '/js/actions.js'

            },
            plugins: {
                src: [
                    MasterTmpDir + '/js/plugins.js'
                ],
                dest: MasterDir + '/js/plugins.js'
            }
        },

        clean: {
            options: {
                force: true,
                trace: true
            },
            dist: ['dist'],
            tmpDir: [MasterTmpDir]
        },


        /**
         * Unifica y minimiza los archivos css que se encuentran en css
         * y copia al directorio dist/css
         */
        'css-include-combine': {
            'libs': {
                relativeDir: pwd + 'css',
                main: pwd + 'css/style.css',
                out: MasterDir + '/css/style.css'
            },
            'theme-default': {
                relativeDir: pwd + 'css',
                main: pwd + 'css/theme-default.css',
                out: MasterDir + '/css/theme-default.css'
            },
            'pace': {
                relativeDir: pwd + 'css/pace',
                main: pwd + 'css/pace/pace.css',
                out: MasterDir + '/css/pace/pace.css'
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
                    dest: MasterTmpDir + '/js',
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
                            match: 'urlMaster',
                            replacement: urlMaster
                        },
                        {
                            match: 'urlDigi',
                            replacement: urlDigi
                        }
                    ]
                },
                files: [{
                    src: [MasterTmpDir + '/js/helpers/appUtils.js'],
                    dest: MasterTmpDir + '/js/helpers/appUtilsHost.js'
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