// modules/renderizarEscolhas.js

export function renderizarEscolhas(escolhas) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = ''; // Limpa as opções anteriores
  
    escolhas.forEach(escolha => {
      const botao = document.createElement('button'); // Cria um botão para cada escolha
      botao.className = 'choice-button'; // Adiciona a classe CSS para estilização
      botao.textContent = escolha.texto; // Define o texto do botão
  
      botao.addEventListener('click', () => { // Adiciona um evento de clique
        const narrativeText = document.getElementById('narrative-text');
        narrativeText.textContent = escolha.consequencia; // Mostra a consequência da escolha
        narrativeText.classList.add('text-consequencia'); // Adiciona um efeito visual ao texto
        choicesContainer.innerHTML = ''; // Remove as opções anteriores
  
        let podeContinuar = true; // Flag para verificar se a fase continua
        
        if (escolha.acao) { // Se a escolha tem uma ação especial (como perder vida)
          podeContinuar = escolha.acao(); // Executa a ação e verifica se pode continuar
        }
  
        // Se o jogador ainda tem vidas e a escolha leva a uma nova fase, cria o botão "Continuar"
        if (podeContinuar && window.estadoJogo.vidas > 0 && escolha.proximaFase) {
          const continuar = document.createElement('button');
          continuar.className = 'choice-button';
          continuar.textContent = 'Continuar →';
          continuar.addEventListener('click', () => {
            window.carregarFase(escolha.proximaFase); // Carrega a próxima fase
          });
          choicesContainer.appendChild(continuar); // Adiciona o botão ao container
        }
      });
  
      choicesContainer.appendChild(botao); // Adiciona o botão de escolha ao container
    });
  }
  