function toggleMjsMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Optionnel : Changer l'opacité au scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.mjs-nav');
    if (window.scrollY > 50) {
        nav.style.height = '70px';
    } else {
        nav.style.height = '80px';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const textBox = document.querySelector('.text-box');
    
    // Animation d'apparition
    textBox.style.opacity = '0';
    textBox.style.transform = 'translateX(-30px)';
    textBox.style.transition = 'all 0.8s ease-out';

    setTimeout(() => {
        textBox.style.opacity = '1';
        textBox.style.transform = 'translateX(0)';
    }, 300);
});

// Animation des chiffres (compteur)
function animateCounters() {
    const stats = document.querySelectorAll('.stat-card h3');
    stats.forEach(stat => {
        const text = stat.innerText;
        if(text.includes('%')) {
            let count = 0;
            const target = parseInt(text);
            const interval = setInterval(() => {
                if(count < target) {
                    count++;
                    stat.innerText = count + '%';
                } else {
                    clearInterval(interval);
                }
            }, 20);
        }
    });
}

// Intersection Observer pour déclencher l'animation au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.about-stats') && observer.observe(document.querySelector('.about-stats'));



document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.tilt');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Si la souris est sur la carte
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
        } else {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
        }
    });
});

// Animation des commentaires au scroll
const revealComments = () => {
    const comments = document.querySelectorAll('.comment-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    comments.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
};

document.addEventListener('DOMContentLoaded', revealComments);



document.getElementById('mjs-contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Envoi en cours...";
    btn.style.background = "#2c3e50";

    // Simulation d'envoi
    setTimeout(() => {
        btn.innerText = "Message envoyé ! ✓";
        btn.style.background = "#27ae60";
        this.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#6fb048";
        }, 3000);
    }, 1500);
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du défilement fluide pour les liens du footer
    const footerLinks = document.querySelectorAll('.footer-links a');

    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le saut brusque
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Ajuste selon la hauteur de ta nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Animation d'apparition du footer au scroll
    const footer = document.querySelector('.mjs-footer');
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // État initial du footer pour l'animation
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    footerObserver.observe(footer);
});

function openDevis() {
    // 1. Scroll doux vers le formulaire de contact
    const contactSection = document.querySelector('#contact');
    window.scrollTo({
        top: contactSection.offsetTop - 50,
        behavior: 'smooth'
    });

    // 2. Petit effet visuel sur le formulaire pour dire "C'est ici !"
    const form = document.querySelector('.contact-form-container');
    
    setTimeout(() => {
        form.style.ring = "4px solid #6fb048";
        form.style.transform = "scale(1.03)";
        form.style.transition = "0.5s";
        
        // On remet à la normale après 1 seconde
        setTimeout(() => {
            form.style.transform = "scale(1)";
        }, 1000);
    }, 800);
}