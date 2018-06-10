#include<Keypad.h>
const byte ROWS = 4;
const byte COLS = 3;
String X="active";
char key[ROWS][COLS]={
  {'1','2','3'},
  {'4','5','6'},
  {'7','8','9'},
  {'*','0','#'}
  };

  byte rowPins[ROWS] = {8,7,6,5};
  byte colPins[COLS] = {4,3,2};

  Keypad keypad = Keypad(makeKeymap(key),rowPins,colPins,ROWS,COLS);
  void sendSerial(){
  Serial.println(X);
  delay(1000);
  if(Serial.available()>0){
    X="stop";
    }
  } 
void setup() {
  
  Serial.begin(9600);
  keypad.addEventListener(keypadEvent);

}

void loop() {
  
  char key = keypad.getKey();
  
 
}

void keypadEvent(KeypadEvent key){
   
    switch(keypad.getState()){

      case PRESSED:
        switch(key){
      case '5':
      X = "ok";
      break;

      case '2':
      X = "up";
      break;

      case '8':
      X = "down";
      break;

      case '#':
      X = "back";
      break;
      
      case '*':
      X = "ok1";
      break;
      
      default:
      Serial.println("invalid");
      
      }
      break;
      default:
      Serial.println("else");
    }
    sendSerial();
  
  }
