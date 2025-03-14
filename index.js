const { SerialPort } = require('serialport');
const axios = require('axios');

// Configura a porta serial (substitua 'COM3' pela porta do seu Arduino)
const port = new SerialPort({
  path: 'COM3',
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

// Lê os dados da porta serial
port.on('data', (dados) => {
  const mensagem = dados.toString().trim(); // Converte os dados para string

  // Verifica se a mensagem começa com "MSG:"
  if (mensagem.startsWith('MSG') && mensagem.endsWith('xy')) {
    console.log('Mensagem válida recebida:', mensagem);

    // Remove o prefixo "MSG:" (opcional)
    const conteudo = mensagem.slice(4).trim();

    // Faz a requisição HTTP com os dados recebidos
    //fazerRequisicaoHTTP(conteudo);
  } else {
    //console.log('Mensagem ignorada:', mensagem); // Mensagens sem "MSG:" são ignoradas
  }
});

console.log('Aguardando dados do Arduino...');