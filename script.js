function saveWine() {
  const name = document.getElementById("name").value;
  const vintage = document.getElementById("vintage").value;
  const region = document.getElementById("region").value;
  const color = document.getElementById("color").value;
  const nose = document.getElementById("nose").value;
  const taste = document.getElementById("taste").value;
  const impression = document.getElementById("impression").value;

  // Vérifier les deux champs de photo (fichier ou capture)
  const photoInput = document.getElementById("photo");
  const captureInput = document.getElementById("capture");
  let photo = "";

  const fileInput = photoInput.files[0] || captureInput.files[0];
  if (fileInput) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photo = e.target.result;
      generatePDF(name, vintage, region, color, nose, taste, impression, photo);
    };
    reader.readAsDataURL(fileInput);
  } else {
    generatePDF(name, vintage, region, color, nose, taste, impression, photo);
  }
}

function generatePDF(name, vintage, region, color, nose, taste, impression, photo) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Ajout du titre
  doc.setFontSize(18);
  doc.text('Fiche de Dégustation de Vin', 20, 20);

  // Ajout des informations sur le vin
  doc.setFontSize(12);
  doc.text(`Nom du vin : ${name}`, 20, 30);
  doc.text(`Millésime : ${vintage}`, 20, 40);
  doc.text(`Région : ${region}`, 20, 50);
  doc.text(`Couleur : ${color}`, 20, 60);
  doc.text(`Nez : ${nose}`, 20, 70);
  doc.text(`Goût : ${taste}`, 20, 90);
  doc.text(`Impression Générale : ${impression}`, 20, 110);

  // Ajout de l'image de l'étiquette si disponible
  if (photo) {
    doc.addImage(photo, 'JPEG', 20, 130, 100, 100); // Ajoute l'image en position 20, 130
  }

  // Téléchargement du PDF
  doc.save('fiche_de_degustation.pdf');
}
