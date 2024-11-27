// Define o valor máximo para o número secreto
let numeroMaximo = 10;

// Lista de números sorteados
let listaDeNumerosSorteados = [];

// Função para gerar um número aleatório entre 1 e numeroMaximo
function geradorDeNumero() {
    // Verifica se todos os números já foram sorteados
    if (listaDeNumerosSorteados.length >= numeroMaximo) {
        console.log(listaDeNumerosSorteados, 'Todos os números possíveis foram sorteados.');
        listaDeNumerosSorteados = []; // Reinicia a lista de números sorteados
        console.log('Reiniciando lista de números sorteados.');
    }

    let numeroEscolhido;

    do {
        numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1); // Sorteia um número
    } while (listaDeNumerosSorteados.includes(numeroEscolhido)); // Garante que não foi sorteado antes

    listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista
    return numeroEscolhido;
}

// Define o numeroSecreto com o valor gerado pelo geradorDeNumero
let numeroSecreto = geradorDeNumero();

// Define a quantidade de chutes que a pessoa usou para descobrir o número secreto
let quantidadeDeChutes = 1;

// Exibição inicial do jogo na tela
function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}
mensagemInicial();

// Função para limpar o campo de input do usuário
function limparInput() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Função para verificar o chute do usuário
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    if (isNaN(chute) || chute < 1 || chute > numeroMaximo) {
        exibirTextoNaTela('h1', 'Entrada inválida!');
        exibirTextoNaTela('p', `Digite um número entre 1 e ${numeroMaximo}.`);
        limparInput();
        return;
    }
    chute === numeroSecreto ? acertou() : errou(chute);
}

// Função para exibir texto em um elemento HTML
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Função executada caso a pessoa acerte
function acertou() {
    let palavraTentativas = quantidadeDeChutes > 1 ? 'tentativas' : 'tentativa';
    let mensagemDeAcerto = `O número secreto era ${numeroSecreto}. Você precisou de ${quantidadeDeChutes} ${palavraTentativas}!`;
    exibirTextoNaTela('h1', 'Você acertou!');
    exibirTextoNaTela('p', mensagemDeAcerto);

    // Habilita o botão de reiniciar
    document.getElementById('reiniciar').removeAttribute('disabled');
}

// Função executada caso a pessoa erre
function errou(chute) {
    exibirTextoNaTela('h1', 'Tente novamente!');
    chute > numeroSecreto
        ? exibirTextoNaTela('p', 'O número secreto é menor que o seu chute.')
        : exibirTextoNaTela('p', 'O número secreto é maior que o seu chute.');
    limparInput();
    quantidadeDeChutes++;
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = geradorDeNumero(); // Atualiza o número secreto com o próximo número válido
    quantidadeDeChutes = 1; // Reseta a quantidade de chutes
    limparInput();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

//Mensagem inicial
mensagemInicial();
