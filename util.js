const THREE = require('three');

class Util {

  static threeVec2PixiPoint(vec) {
    return new PIXI.Point(vec.x, vec.y);
  }
}

module.exports = Util;