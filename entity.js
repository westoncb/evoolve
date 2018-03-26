/*
    Works in THREE.Vector2(), but converts to pixi points before rendering
    Operates on a set of points/vecs
    Has rotation, scale, and position props
    (rotate/scale/translate operations should work the same for all types)
    Keeps a collection of children which inherit transformations from parent (I think just add parent transformations before update, subtract after...)
    Subtypes define getLocalOrigin() method (shift to points by -center (centering them at zero,zero) before scaling and rotation)
    Subtypes define render(g)

    PolygonEntity
    ChainEntity
    SquareEntity
*/

const THREE = require('three');
const Util = require('util');

class Entity {
    constructor(points) {
        this.points = points || [];
        this.children = [];

        this.pos = new THREE.Vector2(0, 0);
        this.vol = new THREE.Vector2(0, 0);
        this.accel = new THREE.Vector2(0, 0);
        this.scale = new THREE.Vector2(1, 1);
        this.rotation = 0;

        this.targetVelocity = new THREE.Vector2();
    }

    accelTo(xAccel, yAccel, xVol, yVol) {
        this.accel.set(xAccel, yAccel);
        this.targetVelocity = new THREE.Vector2(xVol, yVol);
    }

    addChild(child) {
        this.children.push(child);
    }

    abstractUpdate(delta) {
        if (this.vol.length() >= this.targetVelocity.length()) {
            this.accel.set(0, 0);
        }

        this.vol.x += this.accel.x * delta;
        this.vol.y += this.accel.y * delta;

        this.pos.x += this.vol.x * delta;
        this.pos.y += this.vol.y * delta;

        this.update(delta);

        this.transformedPoints = this.transformPoints(this.points);

        this.children.forEach(child => {
            child.pos.add(this.pos);
            child.rotation += this.rotation;

            child.abstractUpdate(delta);
            child.transformedPoints = child.transformPoints(child.points);

            child.rotation -= this.rotation;
            child.pos.sub(this.pos);
        });
    }

    update(delta) {}

    transformPoints(points) {
        return points.map(point => {
            const radius = Math.sqrt(this.pos.x**2 + this.pos.y**2);

            const scaledX = point.x * this.scale.x;
            const rotatedX = scaledX;// * (radius * Math.cos(this.rotation));
            const transformedX = rotatedX + this.pos.x;

            const scaledY = point.y * this.scale.y;
            const rotatedY = scaledY;// * (radius * Math.sin(this.rotation));
            const transformedY = rotatedY + this.pos.y;

            return new PIXI.Point(transformedX, transformedY);
        });
    }

    abstractRender(g) {
        this.render(g, this.transformedPoints);

        this.children.forEach(child => child.abstractRender(g));
    }

    render(g, points) {
        
    }
}

module.exports = Entity;