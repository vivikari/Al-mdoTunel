// modules/fase2.js
export function iniciarFase2() {
  const narrativeText = document.getElementById('narrative-text');
  const choicesContainer = document.getElementById('choices-container');

  const fase2 = {
    textoInicial: "Você consegue um trabalho na enorme Casa de Banhos dos Espíritos, comandada por Madame Uzume, uma bruxa gananciosa. Seus pais estão presos lá, e você precisa encontrar uma forma de salvá-los.",
    escolhas: [
      {
        texto: "Aceitar qualquer tarefa e não questionar nada.",
        consequencia: "Os funcionários começam a gostar de você, mas um espírito misterioso começa a segui-la.",
        proximaFase: "fase3"
      },
      {
        texto: "Explorar a casa à noite.",
        consequencia: "Você encontra uma porta secreta, mas pode ser pega.",
        proximaFase: "fase3"
      },
      {
        texto: "Pedir ajuda ao Espírito Sem Rosto.",
        consequencia: "Ele parece solitário e quer te ajudar… mas será confiável?",
        proximaFase: "fase3"
      }
    ]
  };

  narrativeText.innerText = fase2.textoInicial;
  renderizarEscolhas(fase2.escolhas);

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