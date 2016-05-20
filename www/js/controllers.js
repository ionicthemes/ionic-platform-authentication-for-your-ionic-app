angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  var authProvider = 'basic';
  var authSettings = { 'remember': true };

  $scope.login = function(data) {
    if (data == undefined) {
      var loginDetails = {
        'email': undefined,
        'password': undefined,
      }
    } else {
      var loginDetails = {
        'email': data.email,
        'password': data.password
      }
    }
    Ionic.Auth.login(authProvider, authSettings, loginDetails)
      .then($scope.authSuccess, $scope.authFailure);
  }
  $scope.authSuccess = function() {
    var user = Ionic.User.current();
    var email = user.details.email;
    document.getElementById('EmailUserLogged').innerText = email;
    document.getElementById("logoutButton").disabled = false;
    document.getElementById("loginButton").disabled = true;
  }

  $scope.authFailure = function(errors) {
      var errorString = errors.response.responseText;
      var status = errors.response.status;
      var jsonObj = $.parseJSON('[' + errorString + ']');

      if(status == 401){
          alert(jsonObj[0].error.message);
      }
      else if(status == 422){
        var detalles = jsonObj[0].error.details;
        for (var det in detalles) {
          var errorType = detalles[det].error_type;
          var parameter = detalles[det].parameter;
          alert(detalles[det].error_type +" "+ parameter);
      }
    }
    else{
      alert("An unexpected error has occurred");
    }
  }

  $scope.logout = function(){
    Ionic.Auth.logout();
    document.getElementById('EmailUserLogged').innerText = "No user is logged-in";
    document.getElementById("logoutButton").disabled = true;
    document.getElementById("loginButton").disabled = false;
  }
})

.controller('SignUpCtrl', function($scope) {

  $scope.signupSuccess = function(){
    alert("sign up successfully");
  }

  $scope.signupFailure = function(errors){
    for(var err in errors){
      alert(errors[err]);
    }
  }

  $scope.signup = function(data){
    if (data == undefined) {
      var signupDetails = {
        'email': undefined,
        'password': undefined,
      }
    } else {
      var signupDetails = {
        'email': data.email,
        'password': data.password
      }
    }
    Ionic.Auth.signup(signupDetails).then($scope.signupSuccess, $scope.signupFailure);
  }
});
