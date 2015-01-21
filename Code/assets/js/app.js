var angularApp = angular.module('angularApp', ['ui.bootstrap','ui.router']);;angularApp.config(['$stateProvider', function($stateProvider) {
    // List users state
    $stateProvider
        .state('users', {
            url: '/users',
            resolve: {
                users: ['usersService',
                    function(userService) {

                        return userService.getUsers();
                    }
                ],
                user: function() {
                    return {};
                }
            },
            templateUrl: 'views/userView.html',
            controller: 'usersController',
            controllerAs: 'users'
        })

    // Search users state
    .state('search', {
        url: '/users/search/:query',
        resolve: {
            users: ['$stateParams', 'usersService',
                function($stateParams, usersService) {

                    return usersService.searchUsers($stateParams.query);
                }
            ],
            user: function() {
                return {};
            }
        },
        templateUrl: '...',
        controller: 'usersController',
        controllerAs: 'users'
    })

    // Edit user state
    .state('user', {
        url: '/users/:name',
        resolve: {
            users: function() {
                return [];
            },
            user: ['$stateParams', 'usersService',
                function($stateParams, usersService) {

                    return usersService.getUser($stateParams.name);
                }
            ]
        },
        templateUrl: '...',
        controller: 'usersController',
        controllerAs: 'users'
    });
}]);;angularApp
    .controller('usersController', ['$scope', '$state', 'usersService', 'users', 'user',
        function($scope, $state, usersService, users, user) {

            this.user = user.data;
            this.userQuery = $state.params.query;
            this.users = users.data;
            this.saveUser = function() {
                usersService.saveUser(this.user)
                    .then(function() {
                        $state.go('users');
                    });
            };

            this.searchUsers = function(query) {
                if (!query.length) return $state.go('users');

                $state.go('search', {
                    query: query
                });
            };


            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.alerts = [{
                type: 'danger',
                msg: 'Oh snap! Change a few things up and try submitting again.'
            }, {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.'
            }];

        }
    ]);;angularApp.service('usersService', ['$http', function($http) {
    this.saveUser = function(user) {
        return $http.post('/user', user);
    };

    this.searchUsers = function(query) {
        return $http.get('/users/search/' + query);
    };
    
    this.getUsers = function() {
        //return $http.get('/users');
        return '123';
    };
    
    this.getUser = function(name) {
        return $http.get('/user/' + name);
    };
}]);