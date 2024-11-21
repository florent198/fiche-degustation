function saveWine() {
  const name = document.getElementById("name").value;
  const vintage = document.getElementById("vintage").value;
  const region = document.getElementById("region").value;
  const color = document.getElementById("color").value;
  const nose = document.getElementById("nose").value;
  const taste = document.getElementById("taste").value;
  const impression = document.getElementById("impression").value;

  // Récupérer la photo de l'étiquette
  const photoInput = document.getElementById("photo");
  let photo = "";
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photo = e.target.result;
      saveToStorage(name, vintage, region, color, nose, taste, impression, photo);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveToStorage(name, vintage, region, color, nose, taste, impression, photo);
  }
}

function saveToStorage(name, vintage, region, color, nose, taste, impression, photo) {
  const wine = { name, vintage, region, color, nose, taste, impression, photo };

  const savedWines = JSON.parse(localStorage.getItem("wines")) || [];
  savedWines.push(wine);

  localStorage.setItem("wines", JSON.stringify(savedWines));
  displayWines();
}

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
        ${wine.photo ? `<img src="${wine.photo}" alt="Étiquette du vin" style="max-width:100%; height:auto;">` : ""}
        <button onclick="deleteWine(${index})">Supprimer</button>
      </div>
      <hr>
    `;
  });

  output.innerHTML = html;
}

function deleteWine(index) {
  const savedWines = JSON.parse(localStorage.getItem("wines")) || [];
  savedWines.splice(index, 1);
  localStorage.setItem("wines", JSON.stringify(savedWines));
  displayWines();
}

// Afficher les fiches au chargement
document.addEventListener("DOMContentLoaded", displayWines);
