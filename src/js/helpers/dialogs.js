/**
 * Note: This version requires Angular UI Bootstrap >= v0.6.0
 */

//== Controllers =============================================================//
//


angular.module('dialogs.controllers', ['modal'])

/**
 * Error Dialog Controller
 */
.controller('errorDialogCtrl', ['$scope', '$modalInstance', 'msg',
        function($scope, $modalInstance, msg) {
            //-- Variables -----//
            if (msg instanceof Object) {
                msg = msg.messages;
            }

            $scope.msg = (angular.isDefined(msg)) ? msg : 'An unknown error has occurred.';

            //-- Methods -----//
            //-- Methods -----//

            $scope.close = function() {
                $modalInstance.close();
            }; // end close
        }
    ]) // end ErrorDialogCtrl

/**
 * Wait Dialog Controller
 */
.controller('waitDialogCtrl', ['$scope', '$modalInstance', '$timeout', 'msg', 'progress',
        function($scope, $modalInstance, $timeout, msg, progress) {
            //-- Variables -----//
            if (msg instanceof Object) {
                msg = msg.messages;
            }

            $scope.msg = (angular.isDefined(msg)) ? msg : 'Waiting on operation to complete.';
            $scope.progress = (angular.isDefined(progress)) ? progress : 100;

            //-- Listeners -----//

            // Note: used $timeout instead of $scope.$apply() because I was getting a $$nextSibling error

            // close wait dialog
            $scope.$on('dialogs.wait.complete', function() {
                $timeout(function() {
                    $modalInstance.close();
                });
            }); // end on(dialogs.wait.complete)

            // update the dialog's message
            $scope.$on('dialogs.wait.message', function(evt, args) {
                $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
            }); // end on(dialogs.wait.message)

            // update the dialog's progress (bar) and/or message
            $scope.$on('dialogs.wait.progress', function(evt, args) {
                $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
                $scope.progress = (angular.isDefined(args.progress)) ? args.progress : $scope.progress;
            }); // end on(dialogs.wait.progress)

            //-- Methods -----//

            $scope.getProgress = function() {
                return {
                    'width': $scope.progress + '%'
                };
            }; // end getProgress
        }
    ]) // end WaitDialogCtrl

/**
 * Notify Dialog Controller
 */
.controller('notifyDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg',
        function($scope, $modalInstance, header, msg) {
            //-- Variables -----//
            if (msg instanceof Object) {
                msg = msg.messages;
            }

            $scope.header = (angular.isDefined(header)) ? header : 'Notification';
            $scope.msg = (angular.isDefined(msg)) ? msg : 'Unknown application notification.';

            //-- Methods -----//

            $scope.close = function() {
                $modalInstance.close();
            }; // end close
        }
    ]) // end WaitDialogCtrl

.controller('infoDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg',
        function($scope, $modalInstance, header, msg) {
            //-- Variables -----//
            if (msg instanceof Object) {
                msg = msg.messages;
            }

            $scope.header = (angular.isDefined(header)) ? header : 'Información';
            $scope.msg = (angular.isDefined(msg)) ? msg : 'Unknown application notification.';

            //-- Methods -----//

            $scope.close = function() {
                $modalInstance.close();
            }; // end close
        }
    ]) // end WaitDialogCtrl




.controller('warningDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg',
        function($scope, $modalInstance, header, msg) {
            //-- Variables -----//
            if (msg instanceof Object) {
                msg = msg.messages;
            }

            $scope.header = (angular.isDefined(header)) ? header : 'Warning';
            $scope.msg = (angular.isDefined(msg)) ? msg : 'Unknown application notification.';

            //-- Methods -----//

            $scope.close = function() {
                $modalInstance.close();
            }; // end close
        }
    ]) // end WaitDialogCtrl


/**
 * Confirm Dialog Controller
 */
.controller('confirmDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg',
    function($scope, $modalInstance, header, msg) {
        //-- Variables -----//
        if (msg instanceof Object) {
            msg = msg.messages;
        }

        $scope.header = (angular.isDefined(header)) ? header : 'Confirmation';
        $scope.msg = (angular.isDefined(msg)) ? msg : 'Confirmation required.';

        //-- Methods -----//

        $scope.no = function() {
            $modalInstance.dismiss('no');
        }; // end close

        $scope.yes = function() {
            $modalInstance.close('yes');
        }; // end yes
    }
]) // end ConfirmDialogCtrl / dialogs.controllers


/**
 * Confirm Dialog Controller
 */
.controller('warningConfirmDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg',
        function($scope, $modalInstance, header, msg) {
            //-- Variables -----//
            if (msg instanceof Object) {
                msg = msg.messages;
            }

            $scope.header = (angular.isDefined(header)) ? header : 'Warning';
            $scope.msg = (angular.isDefined(msg)) ? msg : 'Confirmation required.';

            //-- Methods -----//

            $scope.no = function() {
                $modalInstance.dismiss('no');
            }; // end close

            $scope.yes = function() {
                $modalInstance.close('yes');
            }; // end yes
        }
    ]) // end ConfirmDialogCtrl / dialogs.controllers


//== Services ================================================================//

angular.module('dialogs.services', ['modal', 'dialogs.controllers'])

/**
 * Dialogs Service
 */
.factory('$dialogs', ['$modal',
    function($modal) {
        return {
            error: function(msg) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/error.html',
                    controller: 'errorDialogCtrl',
                    resolve: {
                        msg: function() {
                            return angular.copy(msg);
                        }
                    }
                }); // end modal.open
            }, // end error

            wait: function(msg, progress) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/wait.html',
                    controller: 'waitDialogCtrl',
                    resolve: {
                        msg: function() {
                            return angular.copy(msg);
                        },
                        progress: function() {
                            return angular.copy(progress);
                        }
                    }
                }); // end modal.open
            }, // end wait

            notify: function(header, msg) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/notify.html',
                    controller: 'notifyDialogCtrl',
                    resolve: {
                        header: function() {
                            return angular.copy(header);
                        },
                        msg: function() {
                            return angular.copy(msg);
                        }
                    }
                }); // end modal.open
            }, // end notify

            confirm: function(header, msg) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/confirm.html',
                    controller: 'confirmDialogCtrl',
                    resolve: {
                        header: function() {
                            return angular.copy(header);
                        },
                        msg: function() {
                            return angular.copy(msg);
                        }
                    }
                }); // end modal.open
            }, // end confirm

            warningConfirm: function(header, msg) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/warningConfirm.html',
                    controller: 'warningConfirmDialogCtrl',
                    resolve: {
                        header: function() {
                            return angular.copy(header);
                        },
                        msg: function() {
                            return angular.copy(msg);
                        }
                    }
                }); // end modal.open
            }, // end confirm

            warning: function(header, msg) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/warning.html',
                    controller: 'warningDialogCtrl',
                    resolve: {
                        header: function() {
                            return angular.copy(header);
                        },
                        msg: function() {
                            return angular.copy(msg);
                        }
                    }
                }); // end modal.open
            }, // end notify

            info: function(header, msg) {
                return $modal.open({
                    templateUrl: '/master/js/template/dialogs/info.html',
                    controller: 'infoDialogCtrl',
                    resolve: {
                        header: function() {
                            return angular.copy(header);
                        },
                        msg: function() {
                            return angular.copy(msg);
                        }
                    }
                }); // end modal.open
            }, // end notify


            create: function(url, ctrlr, data, opts) {
                    var k = (angular.isDefined(opts.key)) ? opts.key : true;
                    var b = (angular.isDefined(opts.back)) ? opts.back : true;
                    return $modal.open({
                        templateUrl: url,
                        controller: ctrlr,
                        keyboard: k,
                        backdrop: b,
                        resolve: {
                            data: function() {
                                return angular.copy(data);
                            }
                        }
                    }); // end modal.open
                } // end confirm
        };
    }
]) // end $dialogs / dialogs.services


//== Module ==================================================================//

angular.module('dialogs', ['dialogs.services']);