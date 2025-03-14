#include <SPI.h>
#include <LoRa.h>  
String inString = "";    // string to hold input
int val = 0;
 
void setup() {
  Serial.begin(9600);
  
  while (!Serial);
  Serial.println("LoRa Receiver");
  if (!LoRa.begin(433E6)) { // or 915E6
    Serial.println("Starting LoRa failed!");
    while (1);
  }
   // Configurações do LoRa
  LoRa.setSpreadingFactor(14);      // Spreading Factor = 14
  LoRa.setSignalBandwidth(125E3);   // Largura de banda = 125 kHz
  LoRa.setCodingRate4(5);           // Taxa de codificação = 5
  LoRa.setPreambleLength(8);  
   // Limpa o buffer de recepção
  while (LoRa.available()) {
    LoRa.read();
  }
}
 
void loop() {
  
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  String receivedMessage = "";
  if (packetSize) { 
    
    // read packet    
    while (LoRa.available())
    {
      receivedMessage += (char)LoRa.read();      
    }
  }
  Serial.println(receivedMessage);
  //if (receivedMessage.startsWith("MSG")) {
   // Serial.print("Mensagem recebida: ");
  //  Serial.println(receivedMessage.substring(4)); // Remove o cabeçalho e exibe a mensagem
  //}
     
 
}