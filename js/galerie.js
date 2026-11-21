/* Galerie : remplit la fenêtre modale Bootstrap avec l'image du bouton cliqué. */
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modalGalerie');
    if (!modal) { return; }

    var image = document.getElementById('modalGalerieImg');
    var titre = document.getElementById('modalGalerieTitre');
    var texte = document.getElementById('modalGalerieTexte');

    // Événement Bootstrap : déclenché juste avant l'affichage de la modale.
    // event.relatedTarget est le bouton qui a ouvert la modale.
    modal.addEventListener('show.bs.modal', function (event) {
        var bouton = event.relatedTarget;
        if (!bouton) { return; }
        image.src = bouton.dataset.src;
        image.alt = bouton.dataset.alt;
        titre.textContent = bouton.dataset.titre;
        texte.textContent = bouton.dataset.texte;
    });
});
