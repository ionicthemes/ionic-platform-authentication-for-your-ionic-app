angular.module('starter.services', [])

.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(userData) {
    window.localStorage.userLogged = JSON.stringify(userData);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.userLogged || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
