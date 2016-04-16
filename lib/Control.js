import EventEmitter from 'events';

export default class Control extends EventEmitter{
  constructor(params) {
    super();
    this.verbose = params.verbose || false;
    this.queue = []; 
    this.isBusy = false;
    EventEmitter.call(this);
  }
  log() {
    console.log(arguments)
  }
  validAngle(angle) {
    angle = Math.abs(~~angle);
    angle = angle > 180 ? 180 : angle;
    return angle;
  }
  queueCommand(cmd) {
    this.queue.push(cmd);
  }
  next() {
    if(this.isBusy) return;
    if(this.queue.length == 0) return;
    this.isBusy = true;
    let cmd = this.queue[0];
    if(cmd) this.sendCommand(cmd.angle);
  }
  resolve(statusCode) {
    this.isBusy = false;
    let cmd = this.queue.shift();
    if(cmd && cmd.callback) 
      setTimeout( _ => { cmd.callback(statusCode) }, 500);
  }
  rotate(angle) {
    return new Promise( (res, rej) => {
      this.queueCommand({
        timestamp : (new Date()).getTime(),
        callback : res, 
        angle: angle
      });
    });
  }
  bePortrait() {
    this.rotate(0);
  }
  beLandscape() {
    this.rotate(180);
  }
}
