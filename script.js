// Fonction pour générer et enregistrer le PDF
function saveWine() {
  // Créer une nouvelle instance jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Récupérer les données du formulaire
  const tasterName = document.getElementById('tasterName').value;
  const name = document.getElementById('name').value;
  const vintage = document.getElementById('vintage').value;
  const region = document.getElementById('region').value;
  const color = document.getElementById('color').value;
  const nose = document.getElementById('nose').value;
  const taste = document.getElementById('taste').value;
  const impression = document.getElementById('impression').value;

  // Ajouter le titre et les informations du dégustateur
  doc.setFontSize(18);
  doc.text('Fiche de Dégustation de Vin', 10, 10);

  doc.setFontSize(12);
  doc.text(`Prénom du dégustateur : ${tasterName}`, 10, 20);
  doc.text(`Nom du vin : ${name}`, 10, 30);
  doc.text(`Millésime : ${vintage}`, 10, 40);
  doc.text(`Région : ${region}`, 10, 50);
  doc.text(`Couleur : ${color}`, 10, 60);
  
  // Ajouter le nez, le goût et l'impression générale
  doc.text('Nez :', 10, 70);
  doc.text(nose, 10, 80);
  doc.text('Goût :', 10, 100);
  doc.text(taste, 10, 110);
  doc.text('Impression générale :', 10, 130);
  doc.text(impression, 10, 140);

  // Si une photo de l'étiquette est prise (si c'est possible d'enregistrer des images via la capture)
  const photoInput = document.getElementById('capture');
  if (photoInput.files.length > 0) {
    const file = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = e.target.result;
      doc.addImage(img, 'JPEG', 10, 150, 180, 100);
      // Enregistrer le PDF avec l'image de l'étiquette
      doc.save('fiche_de_degustation_vin.pdf');
    };

    // Lire l'image sélectionnée
    reader.readAsDataURL(file);
  } else {
    // Enregistrer le PDF sans image
    doc.save('fiche_de_degustation_vin.pdf');
  }
}
