document.addEventListener('DOMContentLoaded', () => {

    // Efeito do Cursor
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, .faq-question').forEach(elem => {
            elem.addEventListener('mouseover', () => { cursorGlow.style.transform = 'scale(1.5)'; });
            elem.addEventListener('mouseout', () => { cursorGlow.style.transform = 'scale(1)'; });
        });
    }

    // Animação de Scroll
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // Lógica do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
    }

    // NOVA LÓGICA PARA O MENU HAMBÚRGUER
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const body = document.querySelector('body');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('nav-open');
        });

        // Fecha o menu ao clicar em um link (para navegar para a seção)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
            });
        });
    }
});