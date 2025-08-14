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