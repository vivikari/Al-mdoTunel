// script.js
import { iniciarFase1 } from './fase1.js';
import { iniciarFase2 } from './fase2.js';
import { iniciarFase3 } from './fase3.js';
import { iniciarFase4 } from './fase4.js';
import { iniciarFase5 } from './fase5.js';

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const gameContainer = document.getElementById('game-container');
  const startButton = document.getElementById('start-button');

  // Exibe a tela de início e oculta a tela do jogo
  startScreen.style.display = 'block';
  gameContainer.style.display = 'none';

  // Evento de clique no botão "Iniciar Jogo"
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    iniciarFase1(); // Inicia a Fase 1
  });

  // Função para carregar fases dinamicamente
  window.carregarFase = (nomeFase) => {
    if (nomeFase === "fase2") {
      iniciarFase2();
    } else if (nomeFase === "fase3") {
      iniciarFase3();
    } else if (nomeFase === "fase4") {
      iniciarFase4();
    } else if (nomeFase === "fase5") {
      iniciarFase5();
    }
  };
});

// Função para buscar um enigma da API
async function buscarEnigma() {
  try {
    const response = await fetch('https://riddles-api.vercel.app/random');
    const data = await response.json();
    return data; // Retorna o enigma e a resposta
  } catch (error) {
    console.error("Erro ao buscar enigma:", error);
    return null;
  }
}

// Função para exibir o enigma e verificar a resposta
function exibirEnigma(enigma, respostaCorreta) {
  const narrativeText = document.getElementById('narrative-text');
  const choicesContainer = document.getElementById('choices-container');
  const enigmaContainer = document.getElementById('enigma-container');
  const respostaEnigma = document.getElementById('resposta-enigma');
  const enviarResposta = document.getElementById('enviar-resposta');
  const feedbackEnigma = document.getElementById('feedback-enigma');

  // Exibe o enigma
  narrativeText.innerText = enigma;
  choicesContainer.style.display = 'none'; // Oculta as escolhas
  enigmaContainer.style.display = 'block'; // Exibe o campo de resposta

  // Verifica a resposta do jogador
  enviarResposta.addEventListener('click', () => {
    const respostaJogador = respostaEnigma.value.trim().toLowerCase();
    if (respostaJogador === respostaCorreta.toLowerCase()) {
      feedbackEnigma.innerText = "Resposta correta! Você avança para a próxima fase.";
      feedbackEnigma.style.color = "#2ecc71"; // Verde
      setTimeout(() => {
        enigmaContainer.style.display = 'none'; // Oculta o campo de resposta
        choicesContainer.style.display = 'block'; // Exibe as escolhas novamente
        window.carregarFase("fase4"); // Avança para a próxima fase
      }, 2000);
    } else {
      feedbackEnigma.innerText = "Resposta incorreta. Tente novamente!";
      feedbackEnigma.style.color = "#e74c3c"; // Vermelho
    }
  });
}

// Exemplo de uso na Fase 3
export function iniciarFase3() {
  const narrativeText = document.getElementById('narrative-text');
  const choicesContainer = document.getElementById('choices-container');

  const fase3 = {
    textoInicial: "Você encontra um portal misterioso... Para atravessá-lo, resolva o enigma a seguir:",
    escolhas: [
      {
        texto: "Resolver o enigma.",
        proximaFase: "enigma" // Chama a função do enigma
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
      botao.addEventListener('click', async () => {
        if (escolha.proximaFase === "enigma") {
          const enigmaData = await buscarEnigma();
          if (enigmaData) {
            exibirEnigma(enigmaData.riddle, enigmaData.answer);
          } else {
            narrativeText.innerText = "Erro ao carregar o enigma. Tente novamente mais tarde.";
          }
        } else {
          window.carregarFase(escolha.proximaFase);
        }
      });
      choicesContainer.appendChild(botao);
    });
  }
}