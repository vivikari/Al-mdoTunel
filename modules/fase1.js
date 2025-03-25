export function iniciarFase1() {
  const narrativeText = document.getElementById('narrative-text');
  const choicesContainer = document.getElementById('choices-container');

  const fase1 = {
    textoInicial: "Ao atravessar o túnel, você encontra uma cidade cheia de restaurantes vazios, com mesas fartas de comida. Seus pais comem sem hesitar, mas um vento estranho sopra, e figuras sombrias começam a aparecer.",
    escolhas: [
      {
        texto: "Avisar seus pais para pararem de comer.",
        consequencia: "Eles ignoram você e continuam. Você vê seus pais se transformarem em porcos.",
        acao: () => {
          window.estadoJogo.atualizarVidas(-1);
          return window.estadoJogo.vidas > 0;
        },
        proximaFase: "fase2"
      },
      {
        texto: "Fugir e procurar ajuda.",
        consequencia: "Você corre até uma ponte onde vê um jovem misterioso te chamando...",
        proximaFase: "fase2"
      },
      {
        texto: "Esconder-se em um beco.",
        consequencia: "O chão treme, e uma sombra enorme aparece atrás de você. Você é capturado pelas figuras sombrias.",
        acao: () => {
          window.estadoJogo.atualizarVidas(-1);
          return window.estadoJogo.vidas > 0;
        },
        proximaFase: "fase2"
      }
    ]
  };

  narrativeText.textContent = fase1.textoInicial;
  renderizarEscolhas(fase1.escolhas);

  function renderizarEscolhas(escolhas) {
    choicesContainer.innerHTML = '';
    
    escolhas.forEach(escolha => {
      const botao = document.createElement('button');
      botao.className = 'choice-button';
      botao.textContent = escolha.texto;
      
      botao.addEventListener('click', () => {
        narrativeText.textContent = escolha.consequencia;
        narrativeText.classList.add('text-consequencia');
        choicesContainer.innerHTML = '';

        let podeContinuar = true;
        
        if (escolha.acao) {
          podeContinuar = escolha.acao(); // Isso já chama atualizarVidas() se necessário
        }
        
        if (podeContinuar && window.estadoJogo.vidas > 0 && escolha.proximaFase) {
          const continuar = document.createElement('button');
          continuar.className = 'choice-button';
          continuar.textContent = 'Continuar →';
          continuar.addEventListener('click', () => {
            window.carregarFase(escolha.proximaFase);
          });
          choicesContainer.appendChild(continuar);
        }
      });
      
      choicesContainer.appendChild(botao);
    });
  }
}