angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope,$state) {
  var authProvider = 'basic';
  var authSettings = { 'remember': true };
  var existUserLogged = Ionic.User.current();
  if(existUserLogged.isAuthenticated()){
    $scope.loggedEmail = existUserLogged.details.email;
    $scope.hideLogOut = false;
    $scope.showEmail = true;
    $scope.hideLogIn = true;
    // $scope.hideTabLogIn = true;
    // $scope.hideTabUser = false;
  }
  else{
    $scope.hideLogIn = false;
    $scope.hideLogOut = true;
    $scope.showEmail = false;
    // $scope.hideTabLogIn = false;
    // $scope.hideTabUser = true;
  }

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
      .then(authSuccess, authFailure);
  }
  var authSuccess = function() {
    var user = Ionic.User.current();
    $scope.loggedEmail = user.details.email;
    $scope.showEmail = true;
    $scope.hideLogIn = true;
    $scope.hideLogOut = false;
    // $scope.hideTabLogIn = true;
    // $scope.hideTabUser = false;
    $scope.$apply();
    $state.go('tab.user');
  }

  var authFailure = function(errors) {
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
    $scope.showEmail = false;
    $scope.hideLogOut = true;
    $scope.hideLogIn = false;
    // $scope.hideTabLogIn = false;
    // $scope.hideTabUser = true;
    $state.go('tab.login');

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
