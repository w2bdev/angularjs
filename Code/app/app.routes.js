angularApp.config(['$stateProvider', function($stateProvider) {
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
}]);