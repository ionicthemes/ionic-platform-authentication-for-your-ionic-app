// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$state) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if(toState.data.authenticate){
      var existUserLogged = Ionic.User.current();
      if(!existUserLogged.isAuthenticated()){
        event.preventDefault();
        $state.go('tab.login');
      }
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      if (cordova.plugins.Keyboard.hideKeyboardAccessoryBar) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.login', {
        url: '/login',
        views: {
            'tab-login': {
                templateUrl: 'templates/tab-login.html',
                controller: 'LoginCtrl'
            }
          },
        data: {
            authenticate: false
        }
    })

    .state('tab.signup', {
        url: '/signup',
        views: {
            'tab-signup': {
                templateUrl: 'templates/tab-signup.html',
                controller: 'SignUpCtrl'
            }
          },
        data: {
            authenticate: false
        }
})

    .state('tab.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'templates/tab-user.html',
                controller: 'LoginCtrl'
            }
          },
        data: {
              authenticate: true
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/user');

});
