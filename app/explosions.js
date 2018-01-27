class BlueExplosion {
  constructor(x, y) {
   
    const blueExplosionFrames = [];
    for (var i = 1; i < 24; i++) {
      let val = i < 10 ? '0' + i : i;

      // magically works since the spritesheet was loaded with the pixi loader
      blueExplosionFrames.push(PIXI.Texture.fromImage('/assets/animations/blue_explosion/bluspark_000' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    const blueExplosion = new PIXI.extras.AnimatedSprite(blueExplosionFrames);

    const redExplosionFrames = [];
    for (var i = 1; i < 24; i++) {
      let val = i < 10 ? '0' + i : i;

      // magically works since the spritesheet was loaded with the pixi loader
      redExplosionFrames.push(PIXI.Texture.fromImage('/assets/animations/red_explosion/red_snakeplosion_000' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    const redEplosion = new PIXI.extras.AnimatedSprite(redExplosionFrames);
    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    blueExplosion.x = x;
    blueExplosion.y = y;
    blueExplosion.anchor.set(0.5);
    blueExplosion.animationSpeed = 0.5;
    blueExplosion.loop = false
    blueExplosion.onComplete = function () {
      app.stage.removeChild(blueExplosion)
    }
    blueExplosion.play();
    

    app.stage.addChild(blueExplosion);

    // Animate the rotation
    app.ticker.add(function() {
      blueExplosion.rotation += 0.01;
    });

  }
}

class RedExplosion {
  constructor(x, y) {
    const redExplosionFrames = [];
    for (var i = 1; i < 24; i++) {
      let val = i < 10 ? '0' + i : i;
      // magically works since the spritesheet was loaded with the pixi loader
      redExplosionFrames.push(PIXI.Texture.fromImage('/assets/animations/red_explosion/red_snakeplosion_000' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    const redExplosion = new PIXI.extras.AnimatedSprite(redExplosionFrames);
    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    redExplosion.x = x;
    redExplosion.y = y;
    redExplosion.anchor.set(0.5);
    redExplosion.animationSpeed = 0.5;
    redExplosion.loop = false
    redExplosion.onComplete = function () {
      app.stage.removeChild(redExplosion)
    }
    redExplosion.play();
    app.stage.addChild(redExplosion);

    // Animate the rotation
    app.ticker.add(function() {
      redExplosion.rotation += 0.01;
    });

  }
}