export const estadoJogo = {
    vidas: 1,
    gameOverAtivo: false,
  
    atualizarVidas(mudanca) {
      this.vidas = Math.max(0, Math.min(1, this.vidas + mudanca));
      console.log(`Vidas atualizadas: ${this.vidas}`);
  
      document.getElementById('vidas').textContent = this.vidas;
  
      if (mudanca < 0) {
        const vidaElement = document.getElementById('vidas');
        vidaElement.classList.add('perdeu-vida');
        setTimeout(() => vidaElement.classList.remove('perdeu-vida'), 500);
      }
  
      if (this.vidas <= 0 && !this.gameOverAtivo) {
        this.gameOverAtivo = true;
        this.gameOver();
      }
    },
  
    gameOver() {
      console.log("⚠️ GAME OVER! O jogador perdeu todas as vidas.");
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
  };
  
  // Função global para reiniciar o jogo
  window.reiniciarJogo = function() {
    console.log("🔄 Reiniciando o jogo...");
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
  
    estadoJogo.vidas = 1;
    estadoJogo.gameOverAtivo = false;
    document.getElementById('vidas').textContent = estadoJogo.vidas;
    document.getElementById('choices-container').innerHTML = '';
    document.getElementById('narrative-text').innerHTML = '';
  };
  