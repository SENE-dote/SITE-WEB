document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    const formTemoignage = document.getElementById('form-temoignage');
    const listeTemoignages = document.getElementById('liste-temoignages');

    if (formTemoignage && listeTemoignages) {
        formTemoignage.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher la soumission par défaut du formulaire

            const titre = document.getElementById('titre-temoignage').value.trim();
            const contenu = document.getElementById('contenu-temoignage').value.trim();

            if (contenu) {
                const nouveauTemoignage = document.createElement('article');
                nouveauTemoignage.classList.add('temoignage');

                if (titre) {
                    const titreElement = document.createElement('h3');
                    titreElement.textContent = titre;
                    nouveauTemoignage.appendChild(titreElement);
                }

                const contenuElement = document.createElement('p');
                contenuElement.textContent = contenu;
                nouveauTemoignage.appendChild(contenuElement);

                // Ajouter le nouveau témoignage au début de la liste
                listeTemoignages.insertBefore(nouveauTemoignage, listeTemoignages.firstChild.nextSibling); // Après le titre "Les histoires partagées"

                // Réinitialiser le formulaire
                formTemoignage.reset();
            } else {
                alert('Veuillez écrire votre témoignage.');
            }
        });
    }
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCountSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(likeCountSpan.textContent) || 0;
            currentLikes++;
            likeCountSpan.textContent = currentLikes;
            // Ici, dans un contexte réel, vous enverriez probablement une requête au serveur
            // pour enregistrer le "like" pour l'histoire correspondante (via data-histoire-id).
            // Pour l'instant, c'est uniquement côté client.
        });
    });

    const shareButtons = document.querySelectorAll('.share-twitter, .share-facebook, .share-linkedin, .share-whatsapp'); // Ajout de .share-whatsapp
    const currentPageUrl = window.location.href;

    shareButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const url = encodeURIComponent(this.getAttribute('data-url').replace('[URL_DE_LA_PAGE]', currentPageUrl));
            let shareUrl = '';
            const text = encodeURIComponent(this.getAttribute('data-text')); // Récupérer le texte pour WhatsApp et Twitter

            if (this.classList.contains('share-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            } else if (this.classList.contains('share-facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (this.classList.contains('share-linkedin')) {
                const title = encodeURIComponent(document.title);
                const summary = encodeURIComponent(document.querySelector('meta[name="description"]')?.getAttribute('content') || '');
                shareUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}&summary=${summary}&source=${encodeURIComponent(window.location.hostname)}`;
            } else if (this.classList.contains('share-whatsapp')) {
                shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Gestion spécifique pour le lien d'e-mail (pas besoin de window.open)
    const shareEmail = document.querySelector('.share-email');
    if (shareEmail) {
        shareEmail.addEventListener('click', function(event) {
            // Le comportement par défaut d'un lien mailto est généralement ce que nous voulons
        });
    }
});

