// modules/fase4.js
export function iniciarFase4() {
    const narrativeText = document.getElementById('narrative-text');
    const choicesContainer = document.getElementById('choices-container');
  
    const fase4 = {
      textoInicial: "De volta à Casa de Banhos, Madame Uzume te aguarda com um banquete luxuoso. Ela sorri e diz: 'Você trabalhou bem, criança. Mas por que tanta pressa? Fique e coma. Talvez nem precise mais se preocupar com seus pais.' Você percebe que há algo errado na comida – o aroma lembra a maldição que transformou seus pais em porcos.",
      escolhas: [
        {
          texto: "Recusar educadamente e dizer que precisa encontrar seus pais.",
          consequencia: "Madame Uzume fica irritada, mas impressionada com sua determinação. Ela te dá um último teste para provar que merece partir.",
          proximaFase: "fase5"
        },
        {
          texto: "Aceitar um pequeno pedaço para não parecer rude.",
          consequencia: "Algo começa a mudar dentro de você… Você sente que está sendo enfeitiçada.",
          proximaFase: "finalSombrio"
        },
        {
          texto: "Negar com firmeza e desafiar a bruxa.",
          consequencia: "Ela ri e convoca seus espíritos para te prender. Você precisa fugir pelo labirinto subterrâneo da Casa de Banhos.",
          proximaFase: "fase5"
        }
      ]
    };
  
    narrativeText.innerText = fase4.textoInicial;
    renderizarEscolhas(fase4.escolhas);
  
    function renderizarEscolhas(escolhas) {
      choicesContainer.innerHTML = '';
      escolhas.forEach((escolha) => {
        const botao = document.createElement('button');
        botao.className = 'choice-button';
        botao.innerText = escolha.texto;
        botao.addEventListener('click', () => lidarComEscolha(escolha));
        choicesContainer.appendChild(botao);
      });
    }
  
    function lidarComEscolha(escolha) {
      narrativeText.innerText = escolha.consequencia;
      choicesContainer.innerHTML = '';
  
      if (escolha.proximaFase === "fase5") {
        const botaoContinuar = document.createElement('button');
        botaoContinuar.className = 'choice-button';
        botaoContinuar.innerText = "Continuar";
        botaoContinuar.addEventListener('click', () => window.carregarFase(escolha.proximaFase));
        choicesContainer.appendChild(botaoContinuar);
      } else if (escolha.proximaFase === "finalSombrio") {
        narrativeText.innerText += "\n\n🔥 Final Sombrio – A Nova Aprendiz: Madame Uzume gosta do seu espírito forte e te oferece um lugar ao lado dela… para sempre.";
        narrativeText.classList.add("final-sombrio"); // Adiciona a classe do final sombrio
        adicionarBotaoReiniciar();
      }
    }
  
    function adicionarBotaoReiniciar() {
      const botaoReiniciar = document.createElement('button');
      botaoReiniciar.className = 'choice-button';
      botaoReiniciar.innerText = "Reiniciar";
      botaoReiniciar.addEventListener('click', () => window.location.reload());
      choicesContainer.appendChild(botaoReiniciar);
    }
  }