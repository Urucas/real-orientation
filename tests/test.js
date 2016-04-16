import Control from "../lib/Control.js";
import Arduino from "../lib/ArduinoControl.js";
import chai from 'chai';
chai.should();
const expect = chai.expect;
const portName = "/dev/cu.usbmodemFA131"

describe("Test suite", () => {
  it("Test ArduinoControl set the correct params", (done) => {
    let control = new Arduino();
    control.verbose.should.equal(false);
    control.baudRate.should.equal(9600);
    control = new Arduino({});
    control.baudRate.should.equal(9600);
    control = new Arduino({baudRate:19600});
    control.baudRate.should.equal(19600);
    control = new Arduino({portName:portName});
    control.portName.should.equal(portName);
    control = new Arduino({verbose:true});
    control.verbose.should.equal(true);
    done();
  });
  it("Test validAngle", (done) => {
    let control = new Arduino();
    expect(control.validAngle).to.be.a("function");
    control.validAngle(0).should.equal(0);
    control.validAngle(-0).should.equal(0);
    control.validAngle(181).should.equal(180);
    control.validAngle(-45).should.equal(45);
    done();
  });
  it("Test control is initialized", (done) => {
    let control = new Arduino({baudRate:9600, portName:portName, verbose:true});
    control.on('connection', _ => {
      console.log("connection");
      control.rotate(90).then( (response) =>{
        console.log("90", response);
      });
      control.rotate(180).then( (response) =>{
        console.log("180", response);
      });
      control.rotate(45).then( (response) =>{
        console.log("45", response);
      });
      control.rotate(135).then( (response) =>{
        console.log("135", response);
      });
    })
    control.connect();
  }); 
});
