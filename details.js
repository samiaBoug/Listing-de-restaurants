window.onload = function () {
    // recuperer ID 
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantID = urlParams.get('id');

    let restaurant = new XMLHttpRequest();

    restaurant.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let restaurantData = JSON.parse(this.responseText);

            // trouver le restaurant selectionner
            let selectedRestaurant = restaurantData.find(restaurant => restaurant.ID === restaurantID);

            
                // Creer les element html
                let title = document.createElement("h1");
                title.textContent = selectedRestaurant.Nom;
                title.className="titreRestaurant";

                let address = document.createElement("div");
                address.textContent = "Adresse : " + selectedRestaurant.Adress;
                address.className="adresseRestaurant";

                let note = document.createElement("div");
                note.textContent = "Note : " + selectedRestaurant.Note;
                note.className= "noteRestaurant";

                let horaire = document.createElement("div");
                horaire.textContent = "Horaires : " + JSON.stringify(selectedRestaurant.Horaires);
                horaire.className="horaire"
                let telephone = document.createElement("div");
                telephone.textContent = "Téléphone : " +selectedRestaurant.Téléphone;
                telephone.className="telephone";

                let siteWeb = document.createElement("div");
                siteWeb.textContent = "Site Web : " +selectedRestaurant.SiteWeb;
                siteWeb.className="siteWeb";


                // Append les elements
                let section = document.getElementById("DetailsdeRestaurant");
                section.appendChild(title);
                section.appendChild(address);
                section.appendChild(note);
                section.appendChild(horaire);
                section.appendChild(telephone);
                section.appendChild(siteWeb);
                

        }
    };

    restaurant.open("GET", "data.json");
    restaurant.send();
};


