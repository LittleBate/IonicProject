// Ionic Starter App

angular.module('BlaBlaCar', ['ionic'])
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



.controller('BlaBlaCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.title = "test";
 
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.showResult = false;
	
	$scope.showAvis = true;

	$scope.depart = "";

	$scope.arrive = "";

	$scope.date = "";

	$scope.search = function()
	{
		$scope.trajetCherche = [];
		for(i = 0; i < $scope.trajets.length; i++)
		{
			var indexDepart = $scope.trajets[i].depart.indexOf($scope.depart);
			var indexArrive = $scope.trajets[i].arrive.indexOf($scope.arrive);
			if(($scope.depart === "" || indexDepart != -1)
				&& ($scope.arrive === "" || indexArrive != -1)
				&& ($scope.date === "" || $scope.date === $scope.trajets[i].date))
			{
				$scope.trajetCherche.push($scope.trajets[i]);
				}
		}
		$scope.showResult = true;
		$scope.showAvis = false;
	}

	$scope.clear = function()
	{
		$scope.trajetCherche = [];
		$scope.showResult = false;
		$scope.showAvis = true;
		$scope.arrive = "";
		$scope.depart = "";
		$scope.date = "";
	}
	
	$scope.trajetCherche = [];
	
	$scope.trajets = [
		{
			id:'1',
			depart: 'Clermont-Ferrand',
			arrive: 'Rive de gier',
			date: '24/05/2015'
		},
		{
			id:'2',
			depart: 'Clermont-Ferrand',
			arrive: 'Rive de gier',
			date: '25/05/2015'
		},
		{
			id:'3',
			depart: 'Clermont-Ferrand',
			arrive: 'St Chamond',
			date: '24/05/2015'
		},
		{
			id:'4',
			depart: 'Clermont-Ferrand',
			arrive: 'St Etienne',
			date: '25/05/2015'
		},
		{
			id:'5',
			depart: 'Rive de gier',
			arrive: 'Clermont-Ferrand',
			date: '27/05/2015'
		},
		{
			id:'6',
			depart: 'St Chamond',
			arrive: 'Rive de gier',
			date: '25/05/2015'
		},
		{
			id:'7',
			depart: 'St Etienne',
			arrive: 'St Chamond',
			date: '24/05/2015'
		},
		{
			id:'8',
			depart: 'St Etienne',
			arrive: 'Clermont-Ferrans',
			date: '24/05/2015'
		},
		{
			id:'9',
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '24/05/2015'
		},
		{
			id:'10',
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '27/05/2015'
		},
		{
			id:'11',
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '26/05/2015'
		},
		{
			id:'12',
			depart: 'St Chamond',
			arrive: 'Clermont-Ferrand',
			date: '27/05/2015'
		},
		{
			id:'13',
			depart: 'St Etienne',
			arrive: 'Clermont-Ferrand',
			date: '26/05/2015'
		},
		{
			id:'14',
			depart: 'Rive de gier',
			arrive: 'St Etienne',
			date: '24/05/2015'
		},
		{
			id:'15',
			depart: 'Rive de gier',
			arrive: 'St Chamond',
			date: '27/05/2015'
		}
	];

});

