// Importa os módulos das fases e o estado do jogo
import { iniciarFase1 } from './modules/fase1.js';
import { iniciarFase2 } from './modules/fase2.js';
import { iniciarFase3 } from './modules/fase3.js';
import { iniciarFase4 } from './modules/fase4.js';
import { iniciarFase5 } from './modules/fase5.js';
import { estadoJogo } from './modules/estadoJogo.js'; // Importa a lógica do jogo

// Inicializa o estado global no objeto window para ser acessível em outros arquivos
window.estadoJogo = estadoJogo;

// Função global para reiniciar o jogo
window.reiniciarJogo = function() {
  console.log("🔄 Reiniciando jogo...");
  
  // Esconde o jogo e volta para a tela inicial
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
  
  // Reseta o estado do jogo
  estadoJogo.vidas = 1;
  estadoJogo.gameOverAtivo = false;
  document.getElementById('vidas').textContent = estadoJogo.vidas;
  document.getElementById('choices-container').innerHTML = '';
  document.getElementById('narrative-text').innerHTML = '';
};

// Aguarda o carregamento do DOM para iniciar os eventos
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ Jogo carregado!");

  // Obtém o botão de início do jogo e adiciona um evento de clique
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    console.log("🎮 Iniciando jogo...");
    
    // Oculta a tela inicial e exibe o container do jogo
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    
    // Inicia a primeira fase
    iniciarFase1();
  });

  // Função responsável pela navegação entre fases
window.carregarFase = (nomeFase) => {
  document.getElementById('choices-container').innerHTML = ''; // Limpa as escolhas anteriores
  
  // Navegação entre fases
  switch(nomeFase) {
    case "fase2":
      iniciarFase2();  // Chama a função para a fase 2
      break;
    case "fase3":
      iniciarFase3();  // Chama a função para a fase 3
      break;
    case "fase4":
      iniciarFase4();  // Chama a função para a fase 4
      break;
    case "fase5":
      iniciarFase5();  // Chama a função para a fase 5
      break;
    default:
      iniciarFase1();  // Caso não tenha um nome de fase válido, inicia a fase 1
  }
 };
});
