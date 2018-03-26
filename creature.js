const Entity = require('./entity.js');
const PolygonEntity = require('./polygonEntity.js');
const THREE = require('three');

class Creature extends Entity{
    constructor() {
        super();

        this.body = new PolygonEntity(this.generatePolygon());
        this.addChild(this.body);

        this.pos.x += this.getVariedInstance(350, 200);
        this.pos.y += this.getVariedInstance(350, 200);
        this.accelTo(this.getVariedInstance(0, 0.1), this.getVariedInstance(0, 0.1), 1, 1);
    }

    generatePolygon() {
        const numPoints = this.getVariedInstance(12, 8, {min: 3, round: true});
        const baseRadius = 75;
        const radiusVariation = 50;
        const rotationStepSize = (Math.PI * 2) / numPoints;
        const rotationStepVariation = 0.5 * rotationStepSize;
        const points = [];

        for (let i = 0; i < numPoints; i++) {
            const dist = this.getVariedInstance(baseRadius, radiusVariation, {min: 25});
            const rotation = this.getVariedInstance(i * rotationStepSize, rotationStepVariation);
            points.push(new THREE.Vector2(dist * Math.cos(rotation), dist * Math.sin(rotation)));
        }

        points.push(points[0]);

        return points;
    }

    getVariedInstance(base, variation, options = {}) {
        const min = options.min || -Number.MAX_VALUE;
        const max = options.max || Number.MAX_VALUE;
        const round = options.round;

        let instance = base + Math.random() * variation * 2 - variation;

        instance = Math.max(min, instance);
        instance = Math.min(max, instance);

        if (round)
            instance = Math.round(instance);

        return instance;
    }
}

module.exports = Creature;