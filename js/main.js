document.addEventListener('DOMContentLoaded', () => {

    // Efeito do Cursor (Mantido)
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        // Ajuste: Cursor interage apenas com elementos interativos, não com a imagem de fundo estática
        document.querySelectorAll('a, button, .faq-question').forEach(elem => {
            elem.addEventListener('mouseover', () => { cursorGlow.style.transform = 'scale(1.5)'; });
            elem.addEventListener('mouseout', () => { cursorGlow.style.transform = 'scale(1)'; });
        });
    }

    // Animação de Scroll (Mantido)
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

    // Lógica para o FAQ (Mantido)
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
});