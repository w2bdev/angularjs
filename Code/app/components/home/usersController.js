angularApp
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
    ]);