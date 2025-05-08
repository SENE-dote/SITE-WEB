const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Défilement automatique toutes les 3 secondes (3000 millisecondes)
setInterval(nextSlide, 3000);

// Afficher la première slide au chargement
showSlide(currentIndex);
