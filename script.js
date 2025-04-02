

let vidas = 3;
let cenaAtual = 0;
let dialogueIndex = 0;

window.vidas = 3;
window.cenaAtual = 0;

const menu = document.getElementById("menu");
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
const background = document.getElementById("background");
const characterDiv = document.getElementById("character");
const dialogueDiv = document.getElementById("dialogue");
const choicesDiv = document.getElementById("choices");
const vidasSpan = document.getElementById("vidas");
const faseCartao = document.getElementById("fase-cartao");
const faseTitle = document.getElementById("fase-title");

// historia principal
const story = [
  {
    type: "transition", // identificador especial
    bg: "intro.jpg",
    dialogueSequence: [
      { character: "Chihiro", text: "Eu não queria me mudar..." },
      { character: "Pai", text: "Vai ser divertido, você vai ver!" },
      { character: "Chihiro", text: "Tudo está estranho aqui..." }
    ],
    next: 1 // próxima fase ou dialogo
  },
  { //1
    type: "transition", // identificador especial
    title: "Fase 1 - O tunel misterioso",
    bg: "image2.jpg",
    dialogueSequence: [
      { character: "Pai", text: "Olhem aquilo! Um túnel no meio do nada" },
      { character: "Mãe", text: "Que estranho… Para o carro, vamos ver!" },
    ],
    next: 2 // próxima fase ou dialogo
  },
  { //2
    character: "Chihiro",
    dialogue: "Eu e meus pais encontramos um túnel estranho. Parece que ele leva para uma cidade abandonada e vazia… Será que eu devo ir com eles?",
    bg: "tunel.jpg",
    choices: [
      { text: "Vamos só dar uma olhada rápida.", next: 4, correta: true },
      { text: "Vou esperar aqui fora.", next: 3, correta: false },
    ]
  },
  { //3
    type: "transition", // identificador especial
    bg: "chihiro_brava.jpg",
    dialogueSequence: [
      { character: "Pai", text: "Chihiro, então vamos entrar e voltamos rapidamente" },
      { character: "Mãe", text: " Só vamos dar uma olhadinha" },
    ],
    next: "finalPais" // final ruim dos pais
  },
  { //4
    type: "transition", // identificador especial
    bg: "entrando_no_tunel.jpg",
    dialogueSequence: [
      { character: "Chihiro", text: "Eu e meus pais entramos no túnel misterioso para ver o que tem do outro lado dele. É um pouco assustador e escuro, mas eu sigo em frente bem perto deles." },
    ],
    next: 5 
  },
  { //5
    type: "transition", // identificador especial
    bg: "chihiro_no_tunel.jpg",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next: 6 
  },
  { //6
    type: "transition", // identificador especial
    bg: "Chihiro_familia_procurando_restaurante.jpg",
    dialogueSequence: [
      { character: "Chihiro", text: "Está tudo tão vazio aqui..." },
      { character: "Pai", text: "Deve ser uma cidade antiga, vamos dar uma olhada" },
      { character: "Mãe", text: "Eu estou morrendo de fome. Vamos explorar" },
      { character: "Pai", text: "Olha só, um restaurante! E parece que está tudo pronto para nós." },
    ],
    next: 7 // próxima fase ou dialogo
  },
  { //7
    type: "transition", // identificador especial
    title: "Fase 2 -  O Banquete Proibido",
    bg: "pais_comendo.jpg",
    dialogueSequence: [
      { character: "Pai", text: "Chihiro, venha comer Chihiro! Está delicioso!" },
      { character: "Mãe", text: "Isso, querida, sente-se!" },
      { character: "Chihiro", text: "De onde veio essa comida? Não tem ninguém aqui!!!" },
      { character: "Pai", text: "Comemos primeiro, pagamos depois. Venha!" },
    ],
    next: 8 // próxima fase ou dialogo
  },
  { //8
    character: "Chihiro",
    dialogue: "Eu estava paralisada vendo meus pais comerem e se transformando em porcos, quando de repente sombras começam a sair do chão. Meu coração disparou, fiquei desesperada e com medo.",
    bg: "pais_porcos_comendo.jpg",
    choices: [
      { text: "Viro-me e corro, desesperada, até uma ponte. No meio do caos, vejo um jovem misterioso me chamando.", next: 9, correta: true },
      { text: "Corro para um beco e me encolho na escuridão.", next: "finalDesaparece", correta: false  },
    ]
  },
  { //9
    type: "transition", // identificador especial
    character: "Chihiro",
    bg: "chihiro_correndo_cidade.jpg",
    dialogue: "A cidade mudou de um minuto para o outro, fiquei morrendo de medo. Sem pensar muito, me virei e comecei a correr o mais rápido que consegui.",
    next: 10 // próxima fase ou dialogo
  },
  { //10
    type: "transition", // identificador especial
    bg: "chihiro_correndo_escada.jpg",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next: 11 
  },
  { //11
    type: "transition", // identificador especial
    bg: "haku_conhece_chi.jpg",
    dialogueSequence:[
      {character: "", 
       text:"Eu corria, corria muito! Meu coração fazia tum-tum-tum bem forte. Eu tava morrendo de medo, muito medo! Aí, PÁ! Bati em alguém."},
      {character: "Chihiro", text: "Quem... quem é você?"},
      {character: "Haku", text: "Eu sou Haku. Não tenha medo, eu vou te ajudar"},
      {character: "Chihiro", text:"Mas... o que está acontecendo aqui? Eu não consigo sair daqui!"},
      {character: "Haku", 
      text:"Eu sei, você não pertence a ilha, logo irá desaparecer, mas eu vou te ajudar a sair desse lugar. Só confie em mim. Para sair daqui, você primeiro vai ter que ajudar na casa de banho, peça o emprego ao Kamaji"}
    ],
    next: 12
  },
  {//12
    character:"Chihiro",
    dialogue: "Eu devo confiar no haku?",
    bg: "haku_conhece_chi.jpg",
    choices: [
      { text: "Não", next: "final4", correta: false },
      { text: "Sim", next: 13, correta: true },
    ]
  },
  {//13
    type: "transition",
    bg:"haku_chihiro_correndo.jpg",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next : 14,
  },
  {//14
    type:"transition",
    bg:"kamaji_intro.jpg",
    title: "Fase 3 - Ajudando na Casa de Banhos",
    dialogueSequence: [
      { character: "Kamaji", text: "Quem está ai?" },
      { character: "Chihiro", text: "Meu nome é Chihiro senhor Kamaji eu preciso de um emprego para conseguir salvar meus pais e voltar pra minha casa" },
    ],
    next: 15,
  },
  {//15
    character: "Kamaji",
    dialogue: "Você tem certeza que aceita esse emprego?",
    bg: "imagem_18.jpg",
    choices: [
      { text: "Sim, farei o que for preciso", next: 16, correta: true },
      { text: "Vou explorar a casa à noite. Eu encontro uma porta secreta, mas… posso ser pega a qualquer momento", next: "portaSec1", correta: true },
    ]
  },
  {//16
    type: "transition", // identificador especial
    bg: "kamaji_joinha.jpg",
    dialogueSequence: [
      { character: "Kamaji", text: "Hmmm, tudo bem… Você conseguiu o trabalho. Comece com nosso novo cliente." },
    ],
    next: 17 
  },
  {//17 
    type: "transition", // identificador especial
    bg: "yubaba_chihiro.jpg",
    dialogueSequence: [
      { character: "Zeniba", text: "Chihiro, tenho um cliente excêntrico hoje." },
      { character: "Zeniba", text: " Ele quer um banho especial. Envie água quente e ajude-o como for necessário." },
    ],
    next: 18
  },
  {//18
    type: "transition", // identificador especial
    bg: "chihiro_vendo_cliente.jpg",
    title: "Fase 4 - O Cliente Fedorento",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next:19 
  },
  {//19
    character: "Chihiro",
    dialogue: "Você está... apodrecendo por dentro?",
    bg: "chihiro_trabalhando.jpg",
    choices: [
      { text: "Vou puxar esse gancho!", next: 20, correta: true},
      { text: "Isso é nojento demais...",next: "yubabaBronca", correta: false  },
      { text: "Tenho que fazer isso direito...", next: "final1", correta: true}//precisa alterar ainda
    ]
  },
  {//20
    type: "transition", // identificador especial
    bg: "semRosto_ouro.jpg",
    dialogueSequence: [
      { character: "", text: "Após o limpar o espirito fedido,vejo o Sem Rosto sendo libertado e fazendo ouro com magia e os funcionários pegando tudo. Eles estavam querendo mais e mais.." },
    ],
    next: 21
  },
  {//21
    type: "transition", // identificador especial
    bg: "semrosto_gordo.jpg",
    title: "Fase 5 - sem rosto e o caos",
    dialogueSequence: [
      { character: "", text: "Depois de ver isso, eu vi que estavam dando comida pro Sem Rosto sem parar, para ele fazer muito mais ouro. Ele ficou muito grande e começou a gritar o meu nome. Eu fiquei super assustada!" },
      { character: "Funcionários", text: "Coma... tudo...!" },
    ],
    next:22 
  },
  {//22
    type: "transition",
    bg:"semrosto_oferecendo_chihiro.jpg",
    dialogueSequence:[
      {character:"chihiro", text:"Sem rosto veio me dar ouro, mas eu não queria nada disso, eu só queria que ele voltasse ao normal"}
    ],
    next: 23,
  },
  {//23
    bg:"semrosto_oferecendo_chihiro.jpg",
    character:"Chihiro",
    dialogue: "Isso ja está fora de controle, preciso fazer alguma coisa...",
    choices:[
      {text:"Vou correr o mais rápido que puder!", next: "semRostoMaluco3", correta: false},
      {text:"Vou chamar ajuda!", next: "semRostoMaluco1", correta: true},
      {text:"Você não precisa disso. Vem comigo.", next: 24, correta: true},
    ]
  },
  {//24
    type: "transition",
    bg:"chihiro_emcima_domar.png",
    dialogueSequence:[
      {character:"chihiro", text:"Após o Sem Rosto perder a cabeça, eu tive que ir até a casa da irmã da Yubaba, a Zeniba, numa floresta mágica."}
      ],
    next: 25,
  },
  {//25
    type:"transition",
    bg:"lin_chihiro.jpg",
    dialogueSequence:[
      {character:"Chihiro", text:"A Lin me ajudou a atravessar o mar pra pegar o trem, mas quando olhei pra trás, vi o Sem Rosto vindo! Meu coração disparou. O que ele queria? Me perseguir de novo ou só me acompanhar?"}
    ],
    next: 26,
  },
  {//26
    type: "transition", // identificador especial
    bg: "chihiro_no_trem.jpg",
    title: "Fase 6 - O trem fantasma",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next:27 
  },
  {//27
    character: "Chihiro",
    dialogue: "Acho q você só queria um amigo...",
    bg: "cena_classica.jpg",
    choices: [
      { text: "Pode ficar comigo até resolvermos tudo.", next: 28, correta: true },
      { text: "Você vai ficar bem sozinho na casa de Zeniba?", next: "semRostofica2", correta: true },
      { text: "Você deveria voltar para a Yubaba", next: "semRostoFica1", correta: false },
    ]      
  },
  {//28
    type: "transition",
    bg: "saindo_do_trem.jpg",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next:29
  },
  {//29
    type: "transition", // identificador especial
    bg: "zeniba_encontro.jpg",
    title: "Fase 7 - Encontro com Zeniba",
    dialogueSequence: [
      { character: "Zeniba", text: "Você veio até aqui com o Sem Rosto, o que está procurando pequena" },
      { character: "Chihiro", text: "Preciso de ajuda para desfazer o feitiço dos meus pais" },
      { character: "Zeniba", text: "Você não pode cair nos truques da Yubaba, pequena" },
      { character: "Zeniba", text: "Lamento mas não posso sair daqui, espero que consiga..." },
    ],
    next: 30
  },
  {//30
    type: "transition", // identificador especial
    bg: "voltando_para_yubaba.jpg",
    title: "Fase 8 - O Último Teste e o Retorno",
    dialogueSequence: [
      { character: "", text: "" },
    ],
    next:31
  },
  {//31
    type: "transition", // identificador especial
    bg: "yubaba_escolha.jpg",
    dialogueSequence: [
      { character: "Yubaba", text: "Escolha com sabedoria, menina" },
    ],
    next:32
  },
  // esse é o final
  {//32
    character: "Chihiro",
    dialogue: "qual eu devo escolher...?",
    bg: "varios_porcos.jpg",
    choices: [
      { text: "Nenhum desses porcos são meus pais.", next: "finalPrinc", correta: true},
      { text: "Acho que são aqueles dois ali...", next: "finalRuim", correta: false },
      { text: "Não sei... mas preciso tentar!", next: "finalBruxa", correta: true }
    ]
  }
];

  // finais bons e ruins.
    // finais bons e ruins.
    const endings = {
      finalPrinc: {
        type: "transition",
        bg: "finalPrinc.png",
        dialogueSequence: [
          { character: "Yubaba", text: "Correto. Seus pais estão livres. Você venceu!" }
        ],
        next: "reset"
      },
      finalBruxa: {
        type: "transition",
        bg: "finalRuim.png",
        dialogueSequence: [
          {character:"Yubaba", text: "Aprendi que fazer a escolha certa nem sempre significa ganhar. Salvei meus pais, mas agora estou presa aqui para sempre."}
        ],
        next: "reset"
      },
      finalRuim: {
        type: "transition",
        bg: "finalBruxa.png",
        dialogueSequence: [
          {character:"Yubaba", text: "Aprendi que achar que sei de tudo pode ser um erro. Preciso olhar bem antes de escolher, ou posso perder algo para sempre."}
        ],
        next: "reset"
      },
      final4: {
        type: "transition",
        character: "Chihiro",
        bg: "chihiro_desapare2.jpg",
        choices: [],
        dialogueSequence: [
          {character:"Chihiro", text: "Estou desaparecendo da ilha, o que está acontecendo?"}
        ], 
        next: 12,
      },
      finalPais: {
        type: "transition",
        bg: "pais_final_porcos.jpg",
        dialogueSequence: [
          { character: "", text: "Mãe! Pai! O que aconteceu com vocês ?!?!" }
        ],
        next: 2 // ← volta para a fase desejada
      },
      finalDesaparece: {
        type: "transition",
        character: "Chihiro",
        bg: "chihiro_desapare1.jpg",
        choices: [],
        dialogueSequence: [
          {character:"Chihiro", text: "Estou desaparecendo da ilha, o que está acontecendo?"}
        ], 
        next: 8,
      },
  
      //a partir daqui 
      //segmentações secundarias
      portaSec1:{
        type: "transition", // identificador especial
        bg: "imagem_19.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Abri a porta e levei um susto! As pedras estavam andando sozinhas! Mas…" },
          { character: "Chihiro", text: "Olhando melhor, vi que eram montes de poeira preta carregando elas. Eles estão trabalhando? Que estranho!" },
        ],
        next: "portaSec2"
      },
      portaSec2:{
        type: "transition", // identificador especial
        bg: "imagem_20.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Fui ajudar e percebi que não eram pedras, eram carvões! Eles levam para aquecer a água do Kamaji" },
          { character: "Chihiro", text: "Nunca pensei que poeiras pudessem trabalhar assim! Sem muita escapatória, acabei aceitanum emprego depois disso." },
        ],
        next: "portaSec3"
      },
      portaSec3:{
        type: "transition", // identificador especial
        bg: "imagem_21.jpg",
        dialogueSequence: [
          { character: "", text: "" },
        ],
        next: 17
      },
      yubabaBronca:{
        type: "transition", // identificador especial
        bg: "imagem_23.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Não quero limpar o espirito fedido" },
          { character: "Chihiro", text: "Yubaba veio me dar a maior bronca..." },
        ],
        next: 19
      },
      semRostoMaluco1: {
        type: "transition",
        bg: "imagem_27.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Pedi ajuda pros funcionários, mas ninguém quis. Todos têm medo do Sem Rosto. No final tive que acalmar ele sozinha." }
        ],
        next: "semRostoMaluco2"
      },
      semRostoMaluco2: {
        type: "transition",
        bg: "imagem_29.jpg",
        dialogueSequence: [
          { character: "", text: "" }
        ],
        next: 24
      },
      semRostoMaluco3: {
        type: "transition",
        bg: "imagem_30.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Resolvi correr do Sem Rosto, mas quando olhei para trás..." },
          { character: "Chihiro", text: "Vi que ele estava correndo na minha direção, meu coração quase pulando pra fora!" },
        ],
        next: "semRostoMaluco4"
      },
      semRostoMaluco4: {
        type: "transition",
        bg: "imagem_28.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Consegui acalmá-lo." },
          { character: "Chihiro", text: "Agora, precisava seguir viagem para encontrar ajuda e quebrar o feitiço dos meus pais" },
        ],
        next: 24
      },
      semRostoFica1: {
        type: "transition",
        bg: "imagem_39.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Sem Rosto, é melhor você voltar… A gente não pode viajar junto." }
        ],
        next: "semRostoFicaC"
      },
      semRostoFicaC: {
        type: "transition",
        bg: "imagem_37.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Mesmo depois de eu pedir pra ele ir embora, ele ficou lá comigo o tempo todo, quietinho." }
        ],
        next: 28
      },
      semRostofica2: {
        type: "transition",
        bg: "imagem_36.jpg",
        dialogueSequence: [
          { character: "Chihiro", text: "Não entendo muito bem porque você quer tanto continuar comigo, mas tudo bem podemos voltar juntos" }
        ],
        next: 28
      },
    };


  function startGame() {
    localStorage.removeItem("chihiroSave"); // zera o progresso antigo
    menu.style.display = "none";
    gameContainer.style.display = "flex";
    renderScene(0); // começa do zero
  }

  function atualizarPlacar() {
    vidasSpan.innerHTML = window.vidas + (window.vidas > 0 ? " ❤️" : "");
  }
  
  function renderScene(index) {
    window.cenaAtual = index;
    const cenaFinal = endings[index]; // busca se é um final
    const scene = story[index] || cenaFinal; // cena pode vir da história ou dos finais
  
    if (!scene) {
      console.error("Cena não encontrada!", index);
      return;
    }
  
    // Atualiza imagem de fundo, se houver
    if (scene.bg) {
      background.style.backgroundImage = `url('./assets/${scene.bg}')`;
    }
  
    // Limpa escolhas antigas
    choicesDiv.innerHTML = '';
  
    // Mostra o título da fase (cartão), se for transição
    if (scene.title && dialogueIndex === 0) {
      faseCartao.innerText = scene.title;
      faseCartao.style.display = 'block';
    } else {
      faseCartao.style.display = 'none';
    }
  
    // Se for cena de transição com múltiplos diálogos
    if (scene.type === 'transition') {
      const dialogue = scene.dialogueSequence?.[dialogueIndex];
    
      if (dialogue) {
        characterDiv.innerText = dialogue.character;
        dialogueDiv.innerText = dialogue.text;
    
        const btn = document.createElement('button');
        btn.innerText = 'Próximo';
        btn.onclick = () => {
          dialogueIndex++;
          renderScene(index);
        };
        choicesDiv.appendChild(btn);
      } else {
        dialogueIndex = 0;
    
        if (scene.next === "reset") {
          resetarJogo();
        } else {
          renderScene(scene.next);
        }
      }
      return;
    }
  
    // Cena comum com escolhas
    characterDiv.innerText = scene.character || '';
    dialogueDiv.innerText = scene.dialogue || '';
  
    scene.choices?.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (!choice.correta) {
          vidas--;
          window.vidas = vidas;
          atualizarPlacar();
  
          if (vidas <= 0) {
            alert("Game Over!");
            location.reload();
            return;
          }
  
          alert("Escolha errada! Você perdeu uma vida.");
        }
  
        renderScene(choice.next);
        atualizarPlacar();
      };
      choicesDiv.appendChild(btn);
    });  
    atualizarPlacar();
  }
  
  startButton.addEventListener("click", () => {
    menu.style.display = "none";
    gameContainer.style.display = "flex";
    renderScene(0); // ou mude para outro índice se quiser começar diferente
  });  