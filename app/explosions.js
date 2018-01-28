class LoseExplosion {
  constructor(x, y, colore) {
   
    const loseExplosionFrames = [];
    for (var i = 1; i < 18; i++) {
      let val = i < 10 ? '0' + i : i;

      // magically works since the spritesheet was loaded with the pixi loader
      loseExplosionFrames.push(PIXI.Texture.fromImage('assets/raw/minis/LOSE/MINIDEATH_000' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    const loseExplosion = new PIXI.extras.AnimatedSprite(loseExplosionFrames);

    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    loseExplosion.x = x;
    loseExplosion.y = y;
    loseExplosion.anchor.set(0.5);
    loseExplosion.animationSpeed = 0.5;
    loseExplosion.tint = colore
    loseExplosion.loop = false
    loseExplosion.onComplete = function () {
      app.stage.removeChild(loseExplosion)
    }
    loseExplosion.play();
    Sfx.fail.play()
    

    app.stage.addChild(loseExplosion);

    // Animate the rotation
    app.ticker.add(function() {
      loseExplosion.rotation += 0.01;
    });

  }
}

class WinExplosion {
  constructor(x, y, colore) {
    const winExplosionFrames = [];
    for (var i = 1; i < 48; i++) {
      let val = i < 10 ? '0' + i : i;
      // magically works since the spritesheet was loaded with the pixi loader
      winExplosionFrames.push(PIXI.Texture.fromImage('assets/raw/minis/win/MINIWIN_000' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    const winExplosion = new PIXI.extras.AnimatedSprite(winExplosionFrames);
    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    winExplosion.x = x;
    winExplosion.y = y;
    winExplosion.anchor.set(0.5);
    winExplosion.animationSpeed = 0.5;
    winExplosion.loop = false
    winExplosion.tint = colore
    winExplosion.onComplete = function () {
      app.stage.removeChild(winExplosion)
    }
    winExplosion.play();
    Sfx.ok.play()
    app.stage.addChild(winExplosion);

    // Animate the rotation
    app.ticker.add(function() {
      winExplosion.rotation += 0.01;
    });

  }
}