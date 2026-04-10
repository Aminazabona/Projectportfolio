
    
    // 1. Initialisation AOS
   const initAOS = () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom', // Permet de détecter plus vite les éléments en haut
    });
};

// On lance AOS dès que la fenêtre est chargée pour éviter le "blanc"
window.addEventListener('load', () => {
    initAOS();
    AOS.refresh(); // Force le rafraîchissement immédiat de toutes les positions
});
document.addEventListener('DOMContentLoaded', () => {
    // 2. Sidebar Menu Logic
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');

    const toggleMenu = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    openBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // 3. Texte Dynamique (Typing)
    const textEl = document.getElementById('dynamic-text');
    const words = ["Developer", "Freelancer", "Artiste", "Designer"];
    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function typeEffect() {
        const current = words[wordIdx];
        if (isDeleting) {
            textEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            textEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 100 : 200;
        if (!isDeleting && charIdx === current.length) {
            isDeleting = true;
            speed = 2000; 
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 500;
        }
        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 4. Compteurs de statistiques (Progressifs)
    const statsBox = document.querySelector('.hero-stats');
    const counters = document.querySelectorAll('.counter');
    
    const runCounter = (el) => {
        const target = +el.dataset.target;
        const update = () => {
            const cur = +el.innerText;
            const inc = target / 60;
            if (cur < target) { 
                el.innerText = Math.ceil(cur + inc); 
                setTimeout(update, 30); 
            } else { el.innerText = target; }
        };
        update();
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            counters.forEach(runCounter);
            observer.unobserve(statsBox);
        }
    }, { threshold: 0.5 });
    
    if (statsBox) observer.observe(statsBox);
});