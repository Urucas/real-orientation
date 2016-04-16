import Control from './Control.js';
import serialport from 'serialport';

export default class Arduino extends Control {
  constructor(params) {
    params = params || {baudRate: 9600, inbyte: "\n"}
    super(params);
    this.baudRate = params.baudRate || 9600;
    this.portName = params.portName;
    this.inbyte = params.inbyte || "\n";
    this.port;
  }
  connect() {
    let port = new serialport.SerialPort(this.portName, {
      baudRate: this.baudRate,
      parser: serialport.parsers.readline('\n')
    });
    this.port = port;
    port.on("close", _ => { this.portClosed();});
    port.on("data", (data) => {
      this.portTalked(data);
    });
    port.on("error", (err) => { console.log(err); });
    port.on("open", _ => {
      // wait a few seconds for arduino to be ready
      setTimeout( _ => { this.portOpened(); }, 2000);
    });
  }
  portTalked(data) {
    this.resolve(~~(data+""));
    setTimeout( _ => { this.next() }, 500);
  }
  portOpened() {
    this.emit("connection");
  }
  portClosed() {
    this.emit("disconnection");
  }
  validMessage(value) {
    return new Buffer(value+"\n");
  }
  sendCommand(value) {
    let cmd = this.validMessage(value);
    let self = this;
    this.port.write(cmd, (err, wr) => {
      if(err) self.emit("error");
    });
  }
}
