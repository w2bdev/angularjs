angularApp.service('usersService', ['$http', function($http) {
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