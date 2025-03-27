import { renderizarEscolhas } from './renderizarEscolhas.js';  // Importando a função

export function iniciarFase1() {
  console.log("▶️ Iniciando Fase 1...");
  
  // Elementos do DOM
  const narrativeText = document.getElementById('narrative-text');
  const choicesContainer = document.getElementById('choices-container');

  // Definição da fase
  const fase1 = {
    textoInicial: "Ao atravessar o túnel, você encontra uma cidade cheia de restaurantes vazios, com mesas fartas de comida. Seus pais comem sem hesitar, mas um vento estranho sopra, e figuras sombrias começam a aparecer.",
    escolhas: [
      {
        texto: "Avisar seus pais para pararem de comer.",
        consequencia: "Eles ignoram você e continuam. Você vê seus pais se transformarem em porcos.",
        acao: () => {
          estadoJogo.atualizarVidas(-1);
          return estadoJogo.vidas > 0;
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
          estadoJogo.atualizarVidas(-1);
          return estadoJogo.vidas > 0;
        },
        proximaFase: "fase2"
      }
    ]
  };

  // Exibe o texto inicial da fase
  narrativeText.textContent = fase1.textoInicial;// Exibe o texto inicial da fase
  renderizarEscolhas(fase1.escolhas);// Chama a função que renderiza as escolhas na tela

}
