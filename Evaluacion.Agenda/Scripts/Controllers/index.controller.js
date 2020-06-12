angular.module('EvaluacionApp', ['ui.bootstrap'])

    .controller('GetContactosController', function ($scope, $rootScope, $uibModal, $log, $http) {

        $rootScope.ApiUrl = 'http://localhost:63257/Api/';
        $rootScope.tipoOperacion = 'Crear';
        $rootScope.tipoOperacionBtn = 'Agregar';

        $rootScope.itemsPerPage = 10;
        $rootScope.totalItems = 0;
        $rootScope.currentPage = 1;
        $rootScope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.filter = '';

        $('#mydivLoader').show();
        $scope.listContactos = [];

        $rootScope.error_form = false;
        $rootScope.nombre_invalido = false;
        $rootScope.apellido_invalido = false;
        $rootScope.telefono_invalido = false;
        $rootScope.email_invalido = false;
        $rootScope.error_proceso = false;
        $rootScope.error_message = '';

        $rootScope.contacto = {
            Id: null,
            Nombre: null,
            ApellidoPaterno: null,
            ApellidoMaterno: null,
            Direccion: null,
            Telefono: null,
            Email: null
        };

        $rootScope.crear = function () {

            $rootScope.contacto = {};

            $uibModal.open({
                animation: true,
                backdrop: true,
                windowClass: 'modal',
                templateUrl: 'crearContactoModal.html',
                controller: 'CreateContactoController',
                size: 'lg',
                resolve: {
                    contacto: function () {
                        return $rootScope.contacto;
                    }
                }
            });

        };

        $scope.eliminar = function (id) {

            $uibModal.open({
                animation: true,
                backdrop: true,
                windowClass: 'modal',
                templateUrl: 'deleteContactoModal.html',
                controller: 'DeleteContactoController',
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
        }

        $scope.editar = function (contacto) {

            $uibModal.open({
                animation: true,
                backdrop: true,
                windowClass: 'modal',
                templateUrl: 'crearContactoModal.html',
                controller: 'CreateContactoController',
                size: 'lg',
                resolve: {
                    contacto: function () {
                        return contacto;
                    }
                }
            });
        }

        $rootScope.GetAll = function () {
            $('#mydivLoader').show();
            $http.get($rootScope.ApiUrl + 'Contacto?numRegistros=' + $rootScope.itemsPerPage + "&numPagina=" + $scope.currentPage + "&filter=" + $scope.filter)
                .then(function (response) {
                    $scope.listContactos = response.data.ListContactos;
                    $rootScope.totalItems = response.data.TotalGlobal;
                    $('#mydivLoader').hide();
                })
                .catch(function (err) {
                    console.error(err);
                    $('#mydivLoader').hide();
                });
        };

        $rootScope.GetAll_ = function () {
            $scope.filter = '';
            $scope.currentPage = 1;
            $scope.GetAll();
        };

        $scope.filtering = function () {
            $scope.currentPage = 1;
            $scope.GetAll();
        }

        $scope.GetAll();


    })
    .controller('CreateContactoController', function ($scope, $rootScope, $uibModalInstance, $http, $log, contacto) {

        let operacion = 'CREATE';
        $rootScope.tipoOperacion = 'Crear';
        $rootScope.tipoOperacionBtn = 'Agregar';
        if (!(contacto.Id == undefined || contacto.Id == null)) {
            operacion = 'UPDATE';
            $rootScope.tipoOperacion = 'Actualizar';
            $rootScope.tipoOperacionBtn = 'Modificar';
        }

        $rootScope.error_proceso = false;
        $rootScope.error_message = '';
        $rootScope.contacto = contacto;
        $scope.submit = function () {

            $rootScope.error_form = false;
            $rootScope.nombre_invalido = false;
            $rootScope.apellido_invalido = false;
            $rootScope.telefono_invalido = false;
            $rootScope.email_invalido = false;

            $rootScope.error_proceso = false;
            $rootScope.error_message = '';

            if (contacto.Nombre == undefined || contacto.Nombre == null) {
                $rootScope.nombre_invalido = true;
                $rootScope.error_form = true;
            } else if (contacto.Nombre.trim() == '') {
                $rootScope.nombre_invalido = true;
                $rootScope.error_form = true;
            }

            if (contacto.ApellidoPaterno == undefined || contacto.ApellidoPaterno == null) {
                $rootScope.apellido_invalido = true;
                $rootScope.error_form = true;
            } else if (contacto.ApellidoPaterno.trim() == '') {
                $rootScope.apellido_invalido = true;
                $rootScope.error_form = true;
            }

            if (contacto.Telefono == undefined || contacto.Telefono == null) {
                $rootScope.telefono_invalido = true;
                $rootScope.error_form = true;
            } else if (contacto.Telefono.toString().trim() == '') {
                $rootScope.telefono_invalido = true;
                $rootScope.error_form = true;
            }

            if (contacto.Email != undefined && contacto.Email != null) {
                var regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                let resultValidation = regexEmail.test(contacto.Email);
                if (!resultValidation) {
                    $rootScope.email_invalido = true;
                    $rootScope.error_form = true;
                }

            }

            if ($rootScope.error_form) return;

            $('#mydivLoader').show();

            if (operacion == 'CREATE') {
                $http.post($rootScope.ApiUrl + 'Contacto', JSON.stringify(contacto))
                    .then(function (response) {

                        if (response.data.Success) {
                            $scope.currentPage = 1;
                            $rootScope.currentPage = 1;
                            $rootScope.contacto = {};
                            $rootScope.GetAll();
                            $scope.cancel();
                        } else {
                            $rootScope.error_proceso = true;
                            $rootScope.error_message = response.data.Message;
                        }
                        $('#mydivLoader').hide();
                    })
                    .catch(function (err) {
                        $rootScope.error_proceso = true;
                        $rootScope.error_message = err.message;
                        $('#mydivLoader').hide();
                    });
            } else {
                $http.put($rootScope.ApiUrl + 'Contacto', JSON.stringify(contacto))
                    .then(function (response) {

                        if (response.data.Success) {
                            $rootScope.contacto = {};                    
                            $scope.cancel();
                        } else {
                            $rootScope.error_proceso = true;
                            $rootScope.error_message = response.data.Message;
                        }
                        $rootScope.GetAll();
                        $('#mydivLoader').hide();
                    })
                    .catch(function (err) {
                        $rootScope.error_proceso = true;
                        $rootScope.error_message = err.message;
                        $rootScope.GetAll();
                        $('#mydivLoader').hide();
                    });
            }          
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $rootScope.error_proceso = false;
            $rootScope.error_message = '';
        };
    })
    .controller('DeleteContactoController', function ($scope, $rootScope, $uibModalInstance, $http, $log, id) {
        $rootScope.error_proceso = false;
        $rootScope.error_message = '';

        $scope.delete = function () {

            $http.delete($rootScope.ApiUrl + 'Contacto?id=' + id.toString())
                .then(function (response) {

                    if (response.data.Success) {
                        $rootScope.GetAll();
                        $scope.cancel();
                    } else {
                        $rootScope.error_proceso = true;
                        $rootScope.error_message = response.data.Message;
                    }
                })
                .catch(function (err) {
                    console.error("Error >> ", err);
                    $rootScope.error_proceso = true;
                    $rootScope.error_message = err.message;
                });
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $rootScope.error_proceso = false;
            $rootScope.error_message = '';
        };
    })
;