import { iniciarFase1 } from './modules/fase1.js';
import { iniciarFase2 } from './modules/fase2.js';
import { iniciarFase3 } from './modules/fase3.js';
import { iniciarFase4 } from './modules/fase4.js';
import { iniciarFase5 } from './modules/fase5.js';

// Sistema Global de Vidas e Estado do Jogo
window.estadoJogo = {
  vidas: 1,
  gameOverAtivo: false,
  
  atualizarVidas: function(mudanca) {
    this.vidas = Math.max(0, Math.min(1, this.vidas + mudanca));
    document.getElementById('vidas').textContent = this.vidas;
    
    if (mudanca < 0) {
      const vidaElement = document.getElementById('vidas');
      vidaElement.classList.add('perdeu-vida');
      setTimeout(() => vidaElement.classList.remove('perdeu-vida'), 500);
    }
    
    if (this.vidas <= 0 && !this.gameOverAtivo) {
      this.gameOverAtivo = true;
      
      const narrativeText = document.getElementById('narrative-text');
      const choicesContainer = document.getElementById('choices-container');
      
      narrativeText.innerHTML = '<span class="final-sombrio">🔥 Você perdeu todas as vidas!</span>';
      choicesContainer.innerHTML = '';
      
      const reiniciar = document.createElement('button');
      reiniciar.className = 'choice-button';
      reiniciar.id = 'reiniciar-jogo';
      reiniciar.textContent = 'Reiniciar';
      reiniciar.addEventListener('click', () => {
        this.gameOverAtivo = false;
        window.reiniciarJogo();
      });
      choicesContainer.appendChild(reiniciar);
    }
  }
};

// Função para reiniciar o jogo
window.reiniciarJogo = function() {
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
  
  window.estadoJogo.vidas = 1;
  window.estadoJogo.gameOverAtivo = false;
  document.getElementById('vidas').textContent = window.estadoJogo.vidas;
  document.getElementById('choices-container').innerHTML = '';
  document.getElementById('narrative-text').innerHTML = '';
};

// Inicialização do Jogo
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    iniciarFase1();
  });

  // Sistema de Navegação entre Fases
  window.carregarFase = (nomeFase) => {
    document.getElementById('choices-container').innerHTML = '';
    switch(nomeFase) {
      case "fase2": iniciarFase2(); break;
      case "fase3": iniciarFase3(); break;
      case "fase4": iniciarFase4(); break;
      case "fase5": iniciarFase5(); break;
      default: iniciarFase1();
    }
  };
});