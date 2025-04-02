function salvarJogo() {
  const estado = {
    cena: window.cenaAtual,
    vidas: window.vidas, // <<< Pega o valor GLOBAL atualizado
    dialogueIndex: window.dialogueIndex
  };
  localStorage.setItem("chihiroSave", JSON.stringify(estado));
  alert("Jogo salvo com sucesso!");
}

function carregarJogo() {
  const estado = localStorage.getItem("chihiroSave");
  if (estado) {
    const dados = JSON.parse(estado);
    window.vidas = dados.vidas; // <<< Atualiza a variável global
    window.cenaAtual = dados.cena;
    window.dialogueIndex = dados.dialogueIndex || 0;

    // Atualiza o PLACAR VISUAL (adicionar esta linha):
    document.getElementById("vidas").textContent = window.vidas; 

    menu.style.display = "none";
    gameContainer.style.display = "flex";
    renderScene(window.cenaAtual); // Renderiza a cena salva
  }
  else{
    alert("Nenhum progresso salvo encontrado.");
  }
}

  // Reseta o progresso salvo
function resetarJogo() {
  localStorage.removeItem("chihiroSave");
    location.reload();
}

// Exporta as funções para o escopo global
window.salvarJogo = salvarJogo;
window.carregarJogo = carregarJogo;
window.resetarJogo = resetarJogo;