document.addEventListener('DOMContentLoaded', () => {

    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Atualiza a posição do nosso cursor customizado
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    
    // Efeito de "crescer" ao passar sobre links e botões
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseover', () => {
            cursorGlow.style.width = '40px';
            cursorGlow.style.height = '40px';
        });
        elem.addEventListener('mouseout', () => {
            cursorGlow.style.width = '20px';
            cursorGlow.style.height = '20px';
        });
    });

});

/* ============================================= */
/* == NOVA LÓGICA PARA A FASE 3 == */
/* ============================================= */

// Lógica para animar elementos ao aparecer na tela (scrollytelling)

// 1. Selecionamos todos os elementos que queremos animar (os que têm a classe 'hidden')
const hiddenElements = document.querySelectorAll('.hidden');

// 2. Criamos o nosso "vigia" (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    // 3. Para cada elemento que o vigia reportar...
    entries.forEach((entry) => {
        // 4. Verificamos se ele está visível na tela
        if (entry.isIntersecting) {
            // 5. Se estiver visível, removemos a classe 'hidden' para a animação acontecer
            entry.target.classList.remove('hidden');
            // 6. (Opcional) Depois que a animação acontece, paramos de vigiar o elemento para economizar recursos
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // A animação começa quando 20% do elemento estiver visível
});

// 7. Mandamos o nosso vigia observar cada um dos elementos selecionados
hiddenElements.forEach((el) => observer.observe(el));

/* ================================================= */
/* == V2: JAVASCRIPT INICIAL DO DIAGNÓSTICO      == */
/* ================================================= */

// Seleciona os elementos da interface
const startBtn = document.querySelector('#start-diagnostic-btn');
const closeBtn = document.querySelector('#close-diagnostic-btn');
const diagnosticTool = document.querySelector('#diagnostic-tool');
const scheduleSessionBtn = document.querySelector('#schedule-session-btn');


// Abre a ferramenta
startBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Impede que o link '#' cause um pulo na página
    diagnosticTool.classList.add('active');
});

// Fecha a ferramenta
closeBtn.addEventListener('click', () => {
    diagnosticTool.classList.remove('active');
});

// Garante que o botão de agendar na tela de resultados também feche o modal
scheduleSessionBtn.addEventListener('click', () => {
    diagnosticTool.classList.remove('active');
});

