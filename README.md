# 🚀 Comunicação Arduino para Arduino usando LoRa e Node.js

Este projeto demonstra a comunicação entre dois arduinos utilizando o módulo **LoRa SX1278 RA-01** na frequência de **433 MHz**.  
Um Arduino atua como **transmissor**, enviando dados de temperatura e umidade coletados pelo sensor **DHT-22** a cada 10 segundos.  
O segundo Arduino atua como **receptor**, recebendo os dados e os enviando para um computador via **serial**.  
Utilizando **Node.js**, os dados são capturados e impressos no console.

---

## 💡 Por que usar este projeto?

Este projeto é ideal para quem deseja:

- Realizar comunicação sem fio de longa distância entre dispositivos.
- Monitorar dados ambientais (temperatura e umidade) de forma eficiente.
- Integrar dados coletados em uma **API** ou projetos locais.
- Utilizar comunicação **LoRa** para projetos **IoT**.

---

## 🛠️ Componentes Utilizados

- 2x Arduino (UNO, Nano, ou outro compatível)
- 2x Módulo LoRa SX1278 RA-01 (433 MHz)
- 1x Sensor DHT-22
- Jumpers e protoboard
- Computador com **Node.js** instalado

---

## 📡 Funcionamento do Projeto

1. O Arduino transmissor coleta os dados do sensor **DHT-22** e envia via **LoRa** a cada 10 segundos.
2. O Arduino receptor recebe os dados e os encaminha para o computador via **porta serial**.
3. Um script em **Node.js** lê os dados da porta serial e os imprime no console.

---

## 💻 Como Executar

1. Carregue o código Arduino no transmissor e no receptor.
2. Conecte o Arduino receptor ao computador.
3. Execute o script Node.js para leitura da porta serial:

   ```bash
   node receiver.js

4. Observe os dados sendo impressos no console, como no exemplo:

    ```bash
    Temperatura: 25.6°C
    Umidade: 60.2%

## 🚀 Possíveis Aplicações
- Monitoramento ambiental remoto
- Sistemas de telemetria em áreas rurais
- Projetos de automação residencial
- Redes LoRa para coleta de dados

## 📝 Licença
- Este projeto está licenciado sob a MIT License.