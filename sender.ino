#include <SPI.h>
#include <LoRa.h>
#include <DHT.h> // Biblioteca da Adafruit para o DHT

#define DHTPIN 8          // Pino onde o DHT22 está conectado
#define DHTTYPE DHT22     // Tipo do sensor (DHT22)

DHT dht(DHTPIN, DHTTYPE); // Inicializa o sensor DHT22
int pot = A2;

void setup() {
  Serial.begin(9600);
  pinMode(pot, INPUT);
  
  dht.begin();            // Inicializa o sensor DHT22

  while (!Serial);  
  Serial.println("LoRa Sender");
  if (!LoRa.begin(433E6)) { // or 915E6, the MHz speed of your module
    Serial.println("Starting LoRa failed!");
    while (1);
  }
   // Configurações do LoRa
  LoRa.setSpreadingFactor(14);      // Spreading Factor = 14
  LoRa.setSignalBandwidth(125E3);   // Largura de banda = 125 kHz
  LoRa.setCodingRate4(5);           // Taxa de codificação = 5
  LoRa.setPreambleLength(8);  
}

void loop() {
  // Leitura do potenciômetro
  int potValue = analogRead(pot);
  
  // Leitura da temperatura e umidade
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Verifica se a leitura do DHT22 foi bem-sucedida
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Falha na leitura do DHT22!");
    return;
  }

  // Preparando a mensagem para envio
  String message = "MSG1Temp" + String(temperature) + "UM" + String(humidity)+"xy";

  // Enviando a mensagem via LoRa
  LoRa.beginPacket();  
  LoRa.print(message);
  LoRa.endPacket();

  // Exibindo a mensagem no Serial Monitor
  Serial.println(message);

  delay(10000); // Aguarda 5 segundos antes de enviar a próxima leitura
}