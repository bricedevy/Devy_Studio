/* Formulaire de contact :
   1) validation Bootstrap côté navigateur (aucune donnée n'est envoyée) ;
   2) brouillon enregistré dans le navigateur avec Web Storage (localStorage).
   Les champs nom et courriel ne sont volontairement PAS enregistrés. */
(function () {
    'use strict';

    var CLE = 'devy-studio-brouillon';
    var OPTIONS = ['fichier-pret', 'maquette']; // identifiants des cases « Options »
    var form = document.getElementById('formContact');
    if (!form) { return; }

    var confirmation = document.getElementById('confirmation');
    var etat = document.getElementById('etat-brouillon');
    var erreurDelai = document.getElementById('erreur-delai');

    // Accès au stockage protégé : il peut être bloqué (navigation privée, réglages).
    function lire() {
        try { return JSON.parse(window.localStorage.getItem(CLE)) || {}; } catch (e) { return {}; }
    }
    function ecrire(donnees) {
        try { window.localStorage.setItem(CLE, JSON.stringify(donnees)); return true; } catch (e) { return false; }
    }
    function effacer() {
        try { window.localStorage.removeItem(CLE); } catch (e) { /* rien à faire */ }
    }

    function collecter() {
        return {
            service: form.service.value,
            quantite: form.quantite.value,
            delai: (form.querySelector('input[name="delai"]:checked') || {}).value || '',
            options: OPTIONS.filter(function (id) { return document.getElementById(id).checked; }),
            message: form.message.value
        };
    }

    function restaurer() {
        var d = lire();
        if (!d || !Object.keys(d).length) { return; }
        if (d.service) { form.service.value = d.service; }
        if (d.quantite) { form.quantite.value = d.quantite; }
        if (d.delai) {
            var radio = form.querySelector('input[name="delai"][value="' + d.delai + '"]');
            if (radio) { radio.checked = true; }
        }
        (d.options || []).forEach(function (id) {
            var c = document.getElementById(id);
            if (c && OPTIONS.indexOf(id) !== -1) { c.checked = true; }
        });
        if (d.message) { form.message.value = d.message; }
        etat.textContent = 'Votre brouillon précédent a été restauré (nom et courriel ne sont pas enregistrés).';
    }

    // Enregistrement du brouillon à chaque modification
    form.addEventListener('input', function () {
        if (ecrire(collecter())) { etat.textContent = 'Brouillon enregistré dans ce navigateur.'; }
    });

    function majErreurDelai() {
        var choisi = form.querySelector('input[name="delai"]:checked');
        erreurDelai.classList.toggle('d-block', !choisi && form.classList.contains('was-validated'));
    }
    form.addEventListener('change', majErreurDelai);

    form.addEventListener('submit', function (event) {
        event.preventDefault();               // pas d'envoi vers un serveur
        form.classList.add('was-validated');  // affiche les messages d'erreur Bootstrap
        majErreurDelai();

        if (!form.checkValidity()) {
            event.stopPropagation();
            var premier = form.querySelector(':invalid');
            if (premier) { premier.focus(); }
            return;
        }
        // Succès : on efface le brouillon, on remet le formulaire à zéro et on annonce la confirmation
        effacer();
        form.reset();
        form.classList.remove('was-validated');
        majErreurDelai();
        etat.textContent = '';
        confirmation.classList.remove('d-none');
        confirmation.focus();
    });

    form.addEventListener('reset', function () {
        effacer();
        form.classList.remove('was-validated');
        confirmation.classList.add('d-none');
        etat.textContent = 'Formulaire effacé.';
        erreurDelai.classList.remove('d-block');
    });

    restaurer();
})();
