// Fonction pour générer le PDF avec les informations du formulaire
function saveWine() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Récupérer les valeurs du formulaire
  const tasterName = document.getElementById("tasterName").value;
  const name = document.getElementById("name").value;
  const vintage = document.getElementById("vintage").value;
  const region = document.getElementById("region").value;
  const color = document.getElementById("color").value;
  const nose = document.getElementById("nose").value;
  const taste = document.getElementById("taste").value;
  const impression = document.getElementById("impression").value;

  // Ajouter les informations au PDF
  doc.text(`Dégustateur: ${tasterName}`, 10, 10);
  doc.text(`Vin: ${name}`, 10, 20);
  doc.text(`Millésime: ${vintage}`, 10, 30);
  doc.text(`Région: ${region}`, 10, 40);
  doc.text(`Couleur: ${color}`, 10, 50);
  doc.text(`Nez: ${nose}`, 10, 60);
  doc.text(`Goût: ${taste}`, 10, 80);
  doc.text(`Impression Générale: ${impression}`, 10, 100);

  // Vérifier s'il y a une image de l'étiquette
  const captureInput = document.getElementById("capture");
  if (captureInput.files.length > 0) {
    const file = captureInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const imgData = e.target.result;
      doc.addImage(imgData, 'JPEG', 10, 120, 180, 160);
      doc.save("fiche_degustation.pdf");
    };
    
    reader.readAsDataURL(file);
  } else {
    // Si pas de photo, on sauvegarde juste les informations textuelles
    doc.save("fiche_degustation.pdf");
  }
}
