// modules/fase1.js
export function iniciarFase1() {
    const narrativeText = document.getElementById('narrative-text');
    const choicesContainer = document.getElementById('choices-container');
  
    const fase1 = {
      textoInicial: "Ao atravessar o túnel, você encontra uma cidade cheia de restaurantes vazios, com mesas fartas de comida. Seus pais comem sem hesitar, mas um vento estranho sopra, e figuras sombrias começam a aparecer.",
      escolhas: [
        {
          texto: "Avisar seus pais para pararem de comer.",
          consequencia: "Eles ignoram você e continuam. Você vê seus pais se transformarem em porcos.",
          proximaFase: null // Fim do jogo
        },
        {
          texto: "Fugir e procurar ajuda.",
          consequencia: "Você corre até uma ponte onde vê um jovem misterioso te chamando. Ele se apresenta como Ren, um aprendiz de feiticeiro, e avisa que você deve encontrar um emprego na Casa de Banhos, ou será apagada do mundo dos espíritos.",
          proximaFase: "fase2" // Próxima fase
        },
        {
          texto: "Esconder-se em um beco.",
          consequencia: "O chão treme, e uma sombra enorme aparece atrás de você. Você é capturado pelas figuras sombrias.",
          proximaFase: null // Fim do jogo
        }
      ]
    };
  
    // Exibe o texto inicial e as escolhas
    narrativeText.innerText = fase1.textoInicial;
    renderizarEscolhas(fase1.escolhas);
  
    // Função para renderizar as escolhas
    function renderizarEscolhas(escolhas) {
      choicesContainer.innerHTML = ''; // Limpa as escolhas anteriores
      escolhas.forEach((escolha) => {
        const botao = document.createElement('button');
        botao.className = 'choice-button';
        botao.innerText = escolha.texto;
        botao.addEventListener('click', () => lidarComEscolha(escolha));
        choicesContainer.appendChild(botao);
      });
    }
  
    // Função para lidar com a escolha do jogador
    function lidarComEscolha(escolha) {
      narrativeText.innerText = escolha.consequencia;
      choicesContainer.innerHTML = ''; // Remove os botões de escolha
  
      if (escolha.proximaFase) {
        const botaoContinuar = document.createElement('button');
        botaoContinuar.className = 'choice-button';
        botaoContinuar.innerText = "Continuar";
        botaoContinuar.addEventListener('click', () => window.carregarFase(escolha.proximaFase));
        choicesContainer.appendChild(botaoContinuar);
      } else {
        const botaoReiniciar = document.createElement('button');
        botaoReiniciar.className = 'choice-button';
        botaoReiniciar.innerText = "Reiniciar";
        botaoReiniciar.addEventListener('click', () => window.location.reload());
        choicesContainer.appendChild(botaoReiniciar);
      }
    }
  }