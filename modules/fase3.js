// modules/fase3.js
export function iniciarFase3() {
    const narrativeText = document.getElementById('narrative-text');
    const choicesContainer = document.getElementById('choices-container');
  
    const fase3 = {
      textoInicial: "Depois de aprender sobre um feitiço para salvar seus pais, você precisa viajar até a Ilha do Guardião das Almas, pegando um trem que viaja sobre águas infinitas. Mas há algo errado…",
      escolhas: [
        {
          texto: "Conversar com os passageiros do trem.",
          consequencia: "Alguns parecem ser almas perdidas que podem ajudá-la… ou enganá-la.",
          proximaFase: null
        },
        {
          texto: "Olhar pela janela e tentar entender para onde está indo.",
          consequencia: "Você percebe que a paisagem muda conforme suas emoções.",
          proximaFase: "fase4"
        },
        {
          texto: "Ficar em silêncio e segurar seu bilhete.",
          consequencia: "Um passageiro encapuzado senta-se ao seu lado e murmura algo.",
          proximaFase: "fase4"
        }
      ]
    };
  
    narrativeText.innerText = fase3.textoInicial;
    renderizarEscolhas(fase3.escolhas);
  
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