#include <Servo.h>
int servoPin = 3;
unsigned long serialdata;
int inbyte;
Servo RealDevice;

void setup() {
  Serial.begin(9600);
  RealDevice.attach(servoPin);
  RealDevice.write(0);
}

void loop() {
  if (Serial.available() > 0)  {
    rotate(serial());
  } 
}

long serial() {
  serialdata = 0;
  // use newline char to break
  while (true) {
    inbyte = Serial.read();
    if (inbyte > 0 && inbyte != 10) { 
      serialdata = serialdata * 10 + inbyte - '0';
    }
    if(inbyte == 10) {
      break;
    }
  }
  inbyte = 0;
  return serialdata;
}

void rotate(long a) {
  if(a >= 0 && a <=180) {
    RealDevice.write(a);
  }
}

