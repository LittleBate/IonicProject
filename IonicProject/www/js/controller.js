angular.module('BlaBlaCar').controller("BlaBlaCtrl", function ($scope, $ionicModal) {

    var viewModel = this;

    viewModel.title = "BlaBlaCar";

	viewModel.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	viewModel.showResult = false;
	
	viewModel.showAvis = true;

	viewModel.depart = "";

	viewModel.arrive = "";

	viewModel.date = "";

    
	viewModel.search = function()
	{
		viewModel.trajetCherche = [];
		for(i = 0; i < viewModel.trajets.length; i++)
		{
		    var departOk = true;
		    var arriveOk = true;
		    var dateOk = true;

			var indexDepart = viewModel.trajets[i].depart.toUpperCase().indexOf(viewModel.depart.toUpperCase());
			var indexArrive = viewModel.trajets[i].arrive.toUpperCase().indexOf(viewModel.arrive.toUpperCase());

            if(viewModel.depart != "" && indexDepart ==-1)
            {
                departOk = false;
            }
            if(viewModel.arrive != "" && indexArrive ==-1)
            {
                departOk = false;
            }
            if(viewModel.date != "" && viewModel.date.toUpperCase() != viewModel.trajets[i].date.toUpperCase())
            {
                departOk = false;
            }

            if(departOk && arriveOk && dateOk)
			{
				viewModel.trajetCherche.push(viewModel.trajets[i]);
            }
		}
		viewModel.showResult = true;
		viewModel.showAvis = false;
	}

	viewModel.clear = function()
	{
		viewModel.trajetCherche = [];
		viewModel.showResult = false;
		viewModel.showAvis = true;
		viewModel.arrive = "";
		viewModel.depart = "";
		viewModel.date = "";
	}
	
	viewModel.trajetCherche = [];
	
	viewModel.trajets = [
		{
			id:'1',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Clermont-Ferrand',
			arrive: 'Rive de gier',
			date: '24/05/2015'
		},
		{
			id:'2',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Clermont-Ferrand',
			arrive: 'Rive de gier',
			date: '25/05/2015'
		},
		{
			id:'3',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Clermont-Ferrand',
			arrive: 'St Chamond',
			date: '24/05/2015'
		},
		{
			id:'4',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Clermont-Ferrand',
			arrive: 'St Etienne',
			date: '25/05/2015'
		},
		{
			id:'5',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Rive de gier',
			arrive: 'Clermont-Ferrand',
			date: '27/05/2015'
		},
		{
			id:'6',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Chamond',
			arrive: 'Rive de gier',
			date: '25/05/2015'
		},
		{
			id:'7',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Etienne',
			arrive: 'St Chamond',
			date: '24/05/2015'
		},
		{
			id:'8',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Etienne',
			arrive: 'Clermont-Ferrans',
			date: '24/05/2015'
		},
		{
			id:'9',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '24/05/2015'
		},
		{
			id:'10',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '27/05/2015'
		},
		{
			id:'11',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '26/05/2015'
		},
		{
			id:'12',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Chamond',
			arrive: 'Clermont-Ferrand',
			date: '27/05/2015'
		},
		{
			id:'13',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'St Etienne',
			arrive: 'Clermont-Ferrand',
			date: '26/05/2015'
		},
		{
			id:'14',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Rive de gier',
			arrive: 'St Etienne',
			date: '24/05/2015'
		},
		{
			id:'15',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 1,
			depart: 'Rive de gier',
			arrive: 'St Chamond',
			date: '27/05/2015'
		}
	];

});

