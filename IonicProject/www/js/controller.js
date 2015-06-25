angular.module('BlaBlaCar').controller("BlaBlaCtrl", function ($scope, $ionicModal) {

    var viewModel = this;

    viewModel.title = "BlaBlaCar";

	viewModel.showResult = false;
	
	viewModel.showAvis = true;
    
    viewModel.ajoutTrajetValide = false;

	viewModel.depart = "";

	viewModel.arrive = "";

	viewModel.date = "";
    
    viewModel.newTrajetDepart = "";
    
    viewModel.newTrajetArrive = "";
    
    viewModel.newTrajetDate = "";
    
    viewModel.newTrajetNbPlaces = 0;

    viewModel.connected = false;
    
    viewModel.login = "";
    
    viewModel.mdp = "";
    
    /*
        Connecte l'utilisateur à partir du login et du mdp saisie 
    */
    viewModel.connect = function()
    {
        index = viewModel.getIndex(viewModel.getListLogin(), viewModel.login)
        user = viewModel.utilisateurs[index];
        if(user.mdp == viewModel.mdp)
        {
            viewModel.currentUser = user;
            viewModel.connected = true;
        }
        viewModel.login = "";
        viewModel.mdp = "";
    }
        
    /*
        Obtient la liste des logins des utilisateurs de l'application
    */
    viewModel.getListLogin = function()
    {
        listLogin = [];
        for(i = 0; i<viewModel.utilisateurs.length; i++)
        {
            listLogin.push(viewModel.utilisateurs[i].login);
        }
        return listLogin;
    }
    
    /*
        Utilisateur connecté.
    */
    viewModel.currentUser = null;
    
    /*
        Id du dernier trajet ajouté.
    */
    viewModel.lastTrajetId = 15;
    
    /*
        Si l'utilisateur n'est pas connecté on lui propose de se connecter.
        Si il se connecte ou est déjà connecté on retourne true.
        False sinon
    */
    viewModel.isConnected = function()
    {
        if(viewModel.currentUser == null)
        {
            viewModel.currentUser = viewModel.utilisateurs[0];
            return true;
        }
        return false;
    }
    
    /*
        Ajoute un nouveau trajet à partir des données saisie.
    */
    viewModel.addTrajet = function()
    {
        id = 0;
        if(viewModel.currentUser != null)
        {
            id = viewModel.currentUser.id;
        }
        if(viewModel.newTrajetNbPlaces < 0) 
        {
            viewModel.newTrajetNbPlaces = 0;
        }
        viewModel.lastTrajetId ++;
        trajet = {
            id:viewModel.lastTrajetId,
			chauffeur: id,
			nbPlaces: viewModel.newTrajetNbPlaces,
            nbPlacesPrises: 0,
            passagers : [],
			depart: viewModel.newTrajetDepart,
			arrive: viewModel.newTrajetArrive,
			date: viewModel.newTrajetDate
        };
        viewModel.trajets.push(trajet);
        viewModel.trajetsUtilisateur.push(trajet);
        viewModel.newTrajetArrive = "";
        viewModel.newTrajetDate = "";
        viewModel.newTrajetDepart = "";
        viewModel.newTrajetNbPlaces = 0;
        viewModel.ajoutTrajetValide = true;
    }
    
    /*
        Obtient un valeur (bool) qui definit si l'utilisateur courant à dejà reserve le trajet donné.
    */
    viewModel.dejaReserve = function(trajet)
    {
        dejaReserve = false;
        for(i = 0; i < trajet.passagers.length; i++)
        {
            if(trajet.passagers[i] == viewModel.currentUser.id)
            {
                dejaReserve = true;
            }
        }
        return dejaReserve;
    }
    
    /*
        Annule la réservation de l'utilisateur sur le trajet donné en paramètre
    */
    viewModel.AnnulerReservation = function(trajet)
    {
        index = viewModel.getIndex(trajet.passagers, viewModel.currentUser);
        trajet.passagers.splice(index, 1);
        viewModel.trajets.push(trajet);
        index = viewModel.getIndex(viewModel.reservations, trajet);
        viewModel.reservations.splice(index, 1);
    }
    
    /*
        Ajoute l'utilisateur courant dans la liste des passagers du trajet.
    */
    viewModel.reserver = function(trajet)
    {
        userId = 0;
        if(viewModel.currentUser !=null)
        {
            userId = viewModel.currentUser.id;
        }
        trajet.passagers.push(userId);
        trajet.nbPlacesPrises++;
        index = viewModel.getIndex(viewModel.trajetCherche, trajet);
        viewModel.trajetCherche.splice(index, 1);
        viewModel.reservations.push(trajet);
    }
    
    /*
        Lance une recherche en fonction des valeurs saisie par l'utilisateur.
    */
	viewModel.search = function()
	{
        if(!viewModel.isConnected)
        {
            return;
        }
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
            
            if(departOk && arriveOk && dateOk 
               && viewModel.trajets[i].nbPlacesPrises < viewModel.trajets[i].nbPlaces)
			{
				viewModel.trajetCherche.push(viewModel.trajets[i]);
            }
		}
		viewModel.showResult = true;
		viewModel.showAvis = false;
	}

    /*
        Restaure les variables dans leur état initial
    */
	viewModel.clear = function()
	{
		viewModel.trajetCherche = [];
		viewModel.showResult = false;
		viewModel.showAvis = true;
		viewModel.arrive = "";
		viewModel.depart = "";
		viewModel.date = "";
	}

    /*
        Obtient l'utilisateur en fonction de l'id donné.
        Retourne null si l'utilisateur n'est pas trouvé.
    */
	viewModel.getUserById = function(id)
	{
	    for(var user in viewModel.utilisateurs)
	    {
	        if(user.id == id)
	        {
	            return user;
	        }
	    }
	    return null;
	}
    
    /*
        Obtient le trajet qui correspond à l'id donné en paramètre
    */
    viewModel.getTrajetById = function(id)
    {
        for(i = 0; i<viewModel.trajets.length; i++)
        {
            if(viewModel.trajets[i].id == id)
            {
                return viewModel.trajets[i];
            }
        }
        return null;
    }

    /*
        Ajoute l'utilisateur à la liste des passagers du trajet
    */
	viewModel.addUtilisateurToTrajet = function(trajet, user)
	{
	    traget.passagers.push(user.id);
	}

    /*
        Supprime l'utilisateur à la liste des passagers du trajet donné.
    */
	viewModel.removeUtilisateurFromTrajet = function(trajet, user)
	{
        trajet.passagers
	}
    
    /*
        Obtient l'index de l'objet dans la liste.
        retourne -1 si la valeur n'est pas trouvé dans la liste.
    */
    viewModel.getIndex = function(list, value)
    {
        for(i = 0; i < list.length; i++)
        {
            if(list[i] == value)
            {
                return i;
            }
        }
        return -1;
    }
	
    /*
        Liste des trajets correspondant à la recherche de l'utilisateur.
    */
	viewModel.trajetCherche = [];
    
    /*
        Liste des trajets créer par l'utilisateur
    */
    viewModel.trajetsUtilisateur = [];
    
    /*
        Liste des trajets réservés par l'utilisateur
    */
    viewModel.reservations = [];

    /*
        Liste des utilisateurs de l'application.
    */
	viewModel.utilisateurs = [
        {
            id: '0',
            nom : "Paul",
            login:"pa",
            mdp:"pa"
        },
        {
            id: '1',
            nom : "Jean",
            login:"je",
            mdp:"je"
        },
        {
            id: '2',
            nom : "Pierre",
            login:"pi",
            mdp:"pi"
        }
	]
	
    /*
        Liste de l'ensemble de trajets enregistrés dans l'application.
    */
	viewModel.trajets = [
		{
			id:'1',
			chauffeur: "",
			nbPlaces: 4,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Clermont-Ferrand',
			arrive: 'Rive de gier',
			date: '24/05/2015'
		},
		{
			id:'2',
			chauffeur: "",
			nbPlaces: 3,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Clermont-Ferrand',
			arrive: 'Rive de gier',
			date: '25/05/2015'
		},
		{
			id:'3',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Clermont-Ferrand',
			arrive: 'St Chamond',
			date: '24/05/2015'
		},
		{
			id:'4',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Clermont-Ferrand',
			arrive: 'St Etienne',
			date: '25/05/2015'
		},
		{
			id:'5',
			chauffeur: "",
			nbPlaces: 4,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Rive de gier',
			arrive: 'Clermont-Ferrand',
			date: '27/05/2015'
		},
		{
			id:'6',
			chauffeur: "",
			nbPlaces: 3,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Chamond',
			arrive: 'Rive de gier',
			date: '25/05/2015'
		},
		{
			id:'7',
			chauffeur: "",
			nbPlaces: 4,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Etienne',
			arrive: 'St Chamond',
			date: '24/05/2015'
		},
		{
			id:'8',
			chauffeur: "",
			nbPlaces: 2,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Etienne',
			arrive: 'Clermont-Ferrans',
			date: '24/05/2015'
		},
		{
			id:'9',
			chauffeur: "",
			nbPlaces: 3,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '24/05/2015'
		},
		{
			id:'10',
			chauffeur: "",
			nbPlaces: 4,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '27/05/2015'
		},
		{
			id:'11',
			chauffeur: "",
			nbPlaces: 2,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Etienne',
			arrive: 'Rive de gier',
			date: '26/05/2015'
		},
		{
			id:'12',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Chamond',
			arrive: 'Clermont-Ferrand',
			date: '27/05/2015'
		},
		{
			id:'13',
			chauffeur: "",
			nbPlaces: 2,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'St Etienne',
			arrive: 'Clermont-Ferrand',
			date: '26/05/2015'
		},
		{
			id:'14',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Rive de gier',
			arrive: 'St Etienne',
			date: '24/05/2015'
		},
		{
			id:'15',
			chauffeur: "",
			nbPlaces: 1,
            nbPlacesPrises: 0,
            passagers : [],
			depart: 'Rive de gier',
			arrive: 'St Chamond',
			date: '27/05/2015'
		}
	];

});

