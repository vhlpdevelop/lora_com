const { SerialPort } = require('serialport');
const axios = require('axios');

// Configura a porta serial (substitua 'COM3' pela porta do seu Arduino)
const port = new SerialPort({
  path: 'COM6',
  baudRate: 9600,
});

// Função para fazer a requisição HTTP
async function fazerRequisicaoHTTP(dados) {
  try {
    const resposta = await axios.post('https://exemplo.com/api', { dados });
    console.log('Resposta da API:', resposta.data);
  } catch (erro) {
    console.error('Erro na requisição HTTP:', erro.message);
  }
}
let ultimaMensagemValida = null;
// Função para calcular a diferença de tempo entre as mensagens válidas
function calcularTempoEntreMensagens() {
  if (ultimaMensagemValida) {
    const agora = new Date();
    const diferencaEmSegundos = Math.floor((agora - ultimaMensagemValida) / 1000);
    const minutos = Math.floor(diferencaEmSegundos / 60);
    const segundos = diferencaEmSegundos % 60;
    console.log(`Tempo desde a última mensagem válida: ${minutos} minutos e ${segundos} segundos`);
  } else {
    console.log('Esta é a primeira mensagem válida recebida.');
  }
  ultimaMensagemValida = new Date(); // Atualiza o tempo da última mensagem válida
}

// Lê os dados da porta serial
port.on('data', (dados) => {
  const mensagem = dados.toString().trim(); // Converte os dados para string
  //console.log(mensagem);

  // Verifica se a mensagem começa com "MSG:" e termina com "xy"
  if (mensagem.startsWith('MSG') && mensagem.endsWith('xy')) {
    console.log('Mensagem válida recebida:', mensagem);

    // Remove o prefixo "MSG:" (opcional)
    const conteudo = mensagem.slice(4).trim();

    // Calcula o tempo desde a última mensagem válida
    calcularTempoEntreMensagens();

    // Faz a requisição HTTP com os dados recebidos
    //fazerRequisicaoHTTP(conteudo);
  } else {
    //console.log('Mensagem ignorada:', mensagem); // Mensagens sem "MSG:" são ignoradas
  }
});

console.log('Aguardando dados do Arduino...');