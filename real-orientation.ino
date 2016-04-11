Servo myservo;
int pos = 0;

void setup()
{
  myservo.attach(D0);
  Spark.function("servo", updateServo);
}

void loop()
{
  // do nothing
}

//this function automagically gets called upon a matching POST request
int updateServo(String command)
{
  uint8_t pos = command.toInt();
  if(pos <= 180) {
    myservo.write(pos);
    return 200;
  }
  else {
    return -1;
  } 
}
