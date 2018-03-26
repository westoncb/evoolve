const Entity = require('./entity.js');

class PolygonEntity extends Entity {
    constructor(points) {
        super(points);
    }

    update(delta) {

    }

    render(g, points) {
        g.lineStyle(2, 0xAA0000, 1);
        g.beginFill(0x445566, 1);
        g.drawPolygon(points);
        g.endFill();
    }
}

module.exports = PolygonEntity;