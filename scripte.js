
let restaurant = new XMLHttpRequest();

restaurant.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let restaurantData = JSON.parse(this.responseText);

        let restaurantNom = [];
        let restauNote = [];
        let restauSpecialite = [];
        let restaurantImg = [];

        for (let i = 0; i < restaurantData.length; i++) {
            restaurantNom.push(restaurantData[i].Nom);
            restauNote.push(restaurantData[i].Note);
            restauSpecialite.push(restaurantData[i].Spécialité);
            restaurantImg.push(restaurantData[i].logo);

            let section = document.getElementById("listesDesRestaurants");
            let divCarte = document.createElement("div");
            divCarte.className = "Carte";
            let titre = document.createElement("h1");
            titre.className= "titreRestaurant";
            let sousTitre = document.createElement("h2");
            sousTitre.className="specialiteRestaurant"
            let pNote = document.createElement("p");
            pNote.className="noteRestaurant";
            let imgetoile = document.createElement("img");
            imgetoile.src="img/etoile.png";
            let noteDiv =document.createElement("div");
            noteDiv.className="noteDiv";

            let img = document.createElement("img");
            img.className="imgRestaurant"
            let lienDetails = document.createElement("a");
            lienDetails.className="lienDetails"
            let divDetails =document.createElement("div");
            divDetails.className= "divDetails"

            titre.textContent = restaurantNom[i];
            sousTitre.textContent = restauSpecialite[i];
            pNote.textContent = restauNote[i];
            img.src = restaurantImg[i];
            lienDetails.textContent = "Voir plus";

            section.appendChild(divCarte);
            divCarte.appendChild(titre);
            divCarte.appendChild(sousTitre);
            divCarte.appendChild(noteDiv);
            noteDiv.appendChild(imgetoile);
            noteDiv.appendChild(pNote);
            divCarte.appendChild(img);
            divCarte.appendChild(divDetails);
            divDetails.appendChild(lienDetails);

            let filtreParSpecialité = document.getElementById("triParSpecialité");
            let optionFiltreSpecialité = document.createElement("option");

            let filtreParNote = document.getElementById("triParNote");
            let optionFiltreNotes = document.createElement("option");

            optionFiltreSpecialité.textContent = restauSpecialite[i];
            optionFiltreSpecialité.value = restauSpecialite[i];

            optionFiltreNotes.textContent = restauNote[i];
            optionFiltreNotes.value = restauNote[i];

            filtreParSpecialité.appendChild(optionFiltreSpecialité);
            filtreParNote.appendChild(optionFiltreNotes);
            
             // fonction voir plus :
            lienDetails.href = "details.html?id=" + restaurantData[i].ID;
            let linksDetails = document.querySelectorAll(".Carte a"); 
            linksDetails.forEach((link) => {
                link.addEventListener("click", function (event) {
                    // 
                    event.preventDefault();

                    // 
                    window.location.href = link.href;
                });
            })
        
               
        }

        //fonction de filtre  : 
        function filterRestaurants() {
            let specialiteScoisie = document.getElementById("triParSpecialité").value;
            let noteChoisie = document.getElementById("triParNote").value;
            let cartesRestaurant = document.getElementsByClassName("Carte");
            for (let i = 0; i < cartesRestaurant.length; i++) {
                let carte = cartesRestaurant[i];
                let specialite = carte.querySelector("h2").textContent;
                let note = carte.querySelector("p").textContent;
                if ((specialiteScoisie === "Tiréparspecialité" || specialiteScoisie === specialite) &&
                    (noteChoisie === "tiré par note" || noteChoisie === note)) {
                    carte.style.display = "block";
                }
                else {
                    carte.style.display = "none";
                }

            }


        }

        //function de recherche :
        function rechercheParNom() {
            // 
            let nomRecherche = document.getElementById("nomRechercher").value.toLowerCase();

            // 
            let cartes = document.getElementsByClassName("Carte");

            //
            for (let i = 0; i < cartes.length; i++) {
                let carte = cartes[i];

                // 
                let nom = carte.querySelector("h1").textContent.toLowerCase();

                // 
              
                if (nom.includes(nomRecherche)) {
                    carte.style.display = "block";
                } else {
                    carte.style.display = "none";
                }
            }

        }

        document.getElementById("triParSpecialité").addEventListener("change", filterRestaurants);
        document.getElementById("triParNote").addEventListener("change", filterRestaurants);
        document.getElementById("bouttonRecherche").addEventListener("click", rechercheParNom);
    }
};

restaurant.open("GET", "data.json");
restaurant.send();


