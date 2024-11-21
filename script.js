// Fonction pour sauvegarder une fiche
function saveWine() {
  const name = document.getElementById("name").value;
  const vintage = document.getElementById("vintage").value;
  const region = document.getElementById("region").value;
  const color = document.getElementById("color").value;
  const nose = document.getElementById("nose").value;
  const taste = document.getElementById("taste").value;
  const impression = document.getElementById("impression").value;

  // Création de l'objet fiche
  const wine = { name, vintage, region, color, nose, taste, impression };

  // Récupération des fiches existantes
  const savedWines = JSON.parse(localStorage.getItem("wines")) || [];
  savedWines.push(wine);

  // Sauvegarde dans le localStorage
  localStorage.setItem("wines", JSON.stringify(savedWines));

  // Affichage des fiches
  displayWines();
}

// Fonction pour afficher les fiches sauvegardées
function displayWines() {
  const savedWines = JSON.parse(localStorage.getItem("wines")) || [];
  const output = document.getElementById("output");

  if (savedWines.length === 0) {
    output.innerHTML = "<p>Aucune fiche enregistrée pour le moment.</p>";
    return;
  }

  let html = "<h2>Fiches de Dégustation</h2>";
  savedWines.forEach((wine, index) => {
    html += `
      <div>
        <h3>${wine.name} (${wine.vintage})</h3>
        <p><strong>Région :</strong> ${wine.region}</p>
        <p><strong>Couleur :</strong> ${wine.color}</p>
        <p><strong>Nez :</strong> ${wine.nose}</p>
        <p><strong>Goût :</strong> ${wine.taste}</p>
        <p><strong>Impression Générale :</strong> ${wine.impression}</p>
        <button onclick="deleteWine(${index})">Supprimer</button>
      </div>
      <hr>
    `;
  });

  output.innerHTML = html;
}

// Fonction pour supprimer une fiche
function deleteWine(index) {
  const savedWines = JSON.parse(localStorage.getItem("wines")) || [];
  savedWines.splice(index, 1);
  localStorage.setItem("wines", JSON.stringify(savedWines));
  displayWines();
}

// Chargement initial des fiches
displayWines();
