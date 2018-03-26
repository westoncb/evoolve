const Creature = require('./creature.js');

window.onload = function() {
    const width = document.body.innerWidth;
    const height = document.body.innerHeight;

    var app = new PIXI.Application(width, height, { antialias: true });

    document.body.appendChild(app.view);

    const creature = new Creature();
    const creatures = [];

    for (let i = 0; i < 5; i++) {
        creatures.push(new Creature());
    }

    var g = new PIXI.Graphics();
    app.stage.addChild(g);

    app.ticker.add((delta) => {
        g.clear();

        creatures.forEach(creature => {
            creature.abstractUpdate(delta);
            creature.abstractRender(g);
        });
    });
}