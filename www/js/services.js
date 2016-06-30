angular.module('starter.services', [])

.service('AuthService', function($q, _) {
  this.userIsLoggedIn = function(){
    var deferred = $q.defer();

    deferred.resolve(Ionic.User.current().isAuthenticated());

    return deferred.promise;
  };

  this.getUser = function(){
    return Ionic.User.current();
  };

  this.doLogin = function(user) {
    var deferred = $q.defer(),
        authProvider = 'basic',
        authSettings = {
          'remember': true
        };

    Ionic.Auth.login(authProvider, authSettings, user)
    .then(function(data){
      deferred.resolve(data);
    }, function(errors){
      var errors_list = [];
      if(errors && errors.response && errors.response.responseText)
      {
        var json_response = JSON.parse(errors.response.responseText);

        if(json_response.error.details.length > 0) {
          _.each(json_response.error.details, function(err){
            var error = {
              code: json_response.meta.status,
              msg: err.errors[0]
            };
            errors_list.push(error);
          });
        }
        else {
          var error = {
            code: json_response.meta.status,
            msg: "An unexpected error has occurred"
          };
          errors_list.push(error);
        }
      }
      else if (errors && errors.length > 0){
        var error = {
          code: "unknown",
          msg: errors[0]
        };
        errors_list.push(error);
      }
      else {
        var error = {
          code: "unknown",
          msg: "An unexpected error has occurred"
        };
        errors_list.push(error);
      }

      deferred.reject(errors_list);
    });

    return deferred.promise;
  };

  this.doSignup = function(user) {
    var deferred = $q.defer(),
        authService = this;

    Ionic.Auth.signup(user)
    .then(function(data){
      // After signup we should automatically login the user
      authService.doLogin(user)
      .then(function(data){
        // success
        deferred.resolve(data);
      },function(err){
        // error
        deferred.reject(err);
      });
    }, function(errors){
      var errors_list = [];
      if(errors && errors.response && errors.response.responseText)
      {
        var json_response = JSON.parse(errors.response.responseText);

        if(json_response.error.details.length > 0) {
          _.each(json_response.error.details, function(err){
            var error = {
              code: json_response.meta.status,
              msg: err.errors[0]
            };
            errors_list.push(error);
          });
        }
        else {
          var error = {
            code: json_response.meta.status,
            msg: "An unexpected error has occurred"
          };
          errors_list.push(error);
        }
      }
      else if (errors && errors.errors && errors.errors.length > 0){
        var error = {
          code: "unknown",
          msg: errors.errors[0]
        };
        errors_list.push(error);
      }
      else {
        var error = {
          code: "unknown",
          msg: "An unexpected error has occurred"
        };
        errors_list.push(error);
      }

      deferred.reject(errors_list);
    });

    return deferred.promise;
  };

  this.doLogout = function() {
    Ionic.Auth.logout();
  };
});
