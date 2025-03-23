// modules/fase5.js
export function iniciarFase5() {
    const narrativeText = document.getElementById('narrative-text');
    const choicesContainer = document.getElementById('choices-container');
  
    const fase5 = {
      textoInicial: "Madame Uzume te leva até um pátio iluminado por lanternas. No centro, há um cercado cheio de porcos. 'Se quiser ir embora, prove que realmente conhece seus pais. Escolha quais deles são humanos.' Você vê os porcos se movendo e o pátio silencioso, apenas com o som da água corrente ao fundo.",
      escolhas: [
        {
          texto: "Olhar atentamente nos olhos dos porcos.",
          consequencia: "Talvez seus pais estejam ali, mas será que são todos? Você escolhe corretamente e seus pais voltam ao normal. Madame Uzume te libera para partir.",
          proximaFase: "finalVerdadeiro"
        },
        {
          texto: "Lembrar do feitiço do Guardião das Almas e usá-lo.",
          consequencia: "O feitiço revela a verdade, mas Madame Uzume ri e diz que era um truque. Você fica presa na Casa de Banhos para sempre.",
          proximaFase: "finalAlternativo"
        },
        {
          texto: "Recusar-se a jogar o jogo da bruxa e confiar em si mesma.",
          consequencia: "Madame Uzume ri e te deixa ir, percebendo que você cresceu e não tem mais medo. Você salva seus pais e volta ao mundo real.",
          proximaFase: "finalVerdadeiro"
        }
      ]
    };
  
    narrativeText.innerText = fase5.textoInicial;
    renderizarEscolhas(fase5.escolhas);
  
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
  
      if (escolha.proximaFase === "finalVerdadeiro") {
        narrativeText.innerText += "\n\n🌸 Final Verdadeiro – O Retorno: Você salva seus pais e atravessa o túnel, voltando ao mundo real. Ao olhar para trás, a cidade dos espíritos desaparece.";
        narrativeText.classList.add("final-verdadeiro"); // Adiciona a classe do final verdadeiro
      } else if (escolha.proximaFase === "finalAlternativo") {
        narrativeText.innerText += "\n\n🌀 Final Alternativo – O Caminho Perdido: Você erra na escolha e acaba esquecendo quem realmente é, se tornando uma nova funcionária da Casa de Banhos.";
        narrativeText.classList.add("final-alternativo"); // Adiciona a classe do final alternativo
      }
  
      adicionarBotaoReiniciar();
    }
  
    function adicionarBotaoReiniciar() {
      const botaoReiniciar = document.createElement('button');
      botaoReiniciar.className = 'choice-button';
      botaoReiniciar.innerText = "Reiniciar";
      botaoReiniciar.addEventListener('click', () => window.location.reload());
      choicesContainer.appendChild(botaoReiniciar);
    }
  }