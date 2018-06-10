int data,x=1,n=0,zero=0;
String X = "active";
void indata(){ // function to read data for about 6 seconds
  for(int i=0;i<5000;i++){
    delay(1);
    data = digitalRead(7);
    if(x!=data){
      x=data;
      if(data == 0){
        zero++;
        if(zero>4){
          zero=0;
          }
        }
      }
    }
  
  }
void sendSerial(){//send serial data to app and listen from it..
  Serial.println(X);
  delay(1000);
  if(Serial.available()>0){
    X="stop";
    }
  }  

void setup() {
  pinMode(7,INPUT);
  pinMode(9,OUTPUT); // notifies user when to input data...
  pinMode(13,OUTPUT);
  Serial.begin(9600);
  
  // put your setup code here, to run once:

}

void loop() {
  digitalWrite(9,HIGH);
  delay(2000);//Glow the led for 2 sec 
  digitalWrite(9,LOW);
  indata(); //read data for 6 seconds
  Serial.println(zero); // check the pattern of input from IR sensor
  switch(zero){
    case 1:
    X="ok";
    break;
    
    case 2:
    X="up";
    break;
    
    case 3:
    X="down";
    break;
    
    case 4:
    X="back";
    break;

    default:
    Serial.println("invalid");
    
    }
    zero=0;
  sendSerial();
  
  
    
  

  // put your main code here, to run repeatedly:

}
