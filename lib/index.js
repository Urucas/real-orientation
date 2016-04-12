import request from 'request';

export default class Control {
  constructor(params) {
    this.deviceId = params.deviceId;
    this.token = params.token;
  }
  validAngle(angle) {
    angle = Math.abs(~~angle);
    angle = angle > 180 ? 180 : angle;
    return angle;
  }
  rotate(angle) {
    angle = validAngle(angle);
  }
  portrait() {
    rotate(0);
  }
  landscape() {
    rotate(180);
  }
}
