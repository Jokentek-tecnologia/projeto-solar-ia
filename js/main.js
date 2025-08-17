document.addEventListener('DOMContentLoaded', () => {

    /* ============================================= */
    /* == EFEITO DO CURSOR (JÁ EXISTENTE)         == */
    /* ============================================= */
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
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
    }

    /* ============================================= */
    /* == ANIMAÇÃO DE SCROLL (JÁ EXISTENTE)       == */
    /* ============================================= */
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        hiddenElements.forEach((el) => observer.observe(el));
    }


    /* ================================================= */
    /* == V2: LÓGICA COMPLETA DO DIAGNÓSTICO         == */
    /* ================================================= */

    // 1. Seleciona todos os elementos da ferramenta que vamos usar
    const startBtn = document.querySelector('#start-diagnostic-btn');
    const closeBtn = document.querySelector('#close-diagnostic-btn');
    const diagnosticTool = document.querySelector('#diagnostic-tool');
    const scheduleSessionBtn = document.querySelector('#schedule-session-btn');
    
    const quizScreen = document.querySelector('#quiz-screen');
    const processingScreen = document.querySelector('#processing-screen');
    const resultsScreen = document.querySelector('#results-screen');
    
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const progressBarSteps = document.querySelectorAll('.progress-bar .step');

    // Verifica se os elementos do diagnóstico existem antes de adicionar os listeners
    if (startBtn && diagnosticTool && closeBtn) {

        // 2. Banco de dados das perguntas e respostas
        const questions = [
            {
                question: "Qual destas opções melhor descreve sua empresa?",
                answers: ["Distribuidora", "Integradora", "Fornecedora de Equipamentos"],
                key: 'profile'
            },
            {
                question: "Qual é o seu maior desafio operacional hoje?",
                answers: ["Custos elevados e perdas", "Previsão de demanda", "Estoque e logística"],
                key: 'challenge'
            },
            {
                question: "Qual o porte da sua operação?",
                answers: ["Pequeno", "Médio", "Grande"],
                key: 'scale'
            }
        ];

        let currentQuestionIndex = 0;
        let userAnswers = {};

        // 3. Função para mostrar a pergunta atual
        function showQuestion() {
            // Limpa as respostas anteriores
            answersContainer.innerHTML = '';
            
            // Atualiza o texto da pergunta
            questionText.textContent = questions[currentQuestionIndex].question;

            // Cria os botões de resposta
            questions[currentQuestionIndex].answers.forEach(answer => {
                const button = document.createElement('button');
                button.className = 'answer-btn';
                button.textContent = answer;
                button.addEventListener('click', () => handleAnswer(answer));
                answersContainer.appendChild(button);
            });

            // Atualiza a barra de progresso
            progressBarSteps.forEach((step, index) => {
                if (index === currentQuestionIndex) {
                    step.classList.add('active');
                }
            });
        }

        // 4. Função para lidar com a resposta do usuário
        function handleAnswer(answer) {
            const currentKey = questions[currentQuestionIndex].key;
            userAnswers[currentKey] = answer;
            
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }

        // 5. Função para calcular e mostrar os resultados
        function showResults() {
            quizScreen.classList.remove('active');
            processingScreen.classList.add('active');

            // Simula um tempo de processamento
            setTimeout(() => {
                processingScreen.classList.remove('active');
                
                // Lógica de resultados que definimos
                const resultTitle = document.querySelector('#result-title');
                const resultMetric = document.querySelector('#result-metric');
                const resultText = document.querySelector('#result-text');

                const challenge = userAnswers.challenge;
                if (challenge === "Custos elevados e perdas") {
                    resultTitle.textContent = "Seu Maior Potencial: Redução de Custos";
                    resultMetric.textContent = "Potencial de Economia Operacional de até 18%";
                    resultText.textContent = "Nossa IA identifica ineficiências em tempo real, otimiza a distribuição e reduz perdas técnicas, convertendo dados em economia direta no seu caixa.";
                } else if (challenge === "Previsão de demanda") {
                    resultTitle.textContent = "Seu Maior Potencial: Previsão Precisa";
                    resultMetric.textContent = "Aumento de até 98% na Acurácia da Previsão";
                    resultText.textContent = "Nossa plataforma analisa dados de mercado, clima e histórico para antecipar a demanda, permitindo que você planeje suas ações e investimentos com segurança.";
                } else { // Estoque e logística
                    resultTitle.textContent = "Seu Maior Potencial: Logística Inteligente";
                    resultMetric.textContent = "Otimização de até 25% na Gestão de Estoque";
                    resultText.textContent = "Nossa IA prevê as necessidades de equipamento e otimiza toda a sua cadeia de suprimentos, garantindo que você tenha o produto certo, no lugar certo, na hora certa.";
                }

                resultsScreen.classList.add('active');
            }, 2500); // Espera 2.5 segundos
        }
        
        // 6. Funções para abrir e fechar a ferramenta
        function openDiagnostic() {
            // Reseta para o estado inicial toda vez que abre
            currentQuestionIndex = 0;
            userAnswers = {};
            progressBarSteps.forEach(step => step.classList.remove('active'));
            resultsScreen.classList.remove('active');
            processingScreen.classList.remove('active');
            quizScreen.classList.add('active');
            
            showQuestion();
            diagnosticTool.classList.add('active');
        }

        function closeDiagnostic() {
            diagnosticTool.classList.remove('active');
        }

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openDiagnostic();
        });

        closeBtn.addEventListener('click', closeDiagnostic);
        scheduleSessionBtn.addEventListener('click', closeDiagnostic);
    }
});