const Colors = {
  blue: 0x09B6FF,
  yellow: 0xF8FF09,
  orange: 0xE88D08,
  red: 0xFF040B,
  purple: 0xAB82E8
}

const Textures = {
  router: PIXI.Texture.fromImage('assets/images/aguja2.png'),
  source: PIXI.Texture.fromImage('assets/images/aroconinsidedark.png'),
  package: PIXI.Texture.fromImage('assets/images/twinkle2.png'),
  ring: PIXI.Texture.fromImage('assets/images/aro de asiento.png'),
  normalMovementFrames: prepareNormalMovementFrames()
}

const Sfx = {
  music: new Howl({ src: ['assets/sounds/space.mp3'], autoplay: true, loop: true }),
  fail:  new Howl({ src: ['assets/sounds/30 - Item_lvdw.mp3']}),
  moveArrow:  new Howl({ src: ['assets/sounds/09 - Menu_slct.mp3']}),
  ok:  new Howl({ src: ['assets/sounds/27 - Item1.mp3']})
}

function prepareNormalMovementFrames() {
  const frames = [];
  for (var i = 1; i < 48; i++) {
    let val = i < 10 ? '0' + i : i;
    // magically works since the spritesheet was loaded with the pixi loader
    frames.push(PIXI.Texture.fromImage('assets/raw/minis/normal/NORMALMINI_000' + val + '.png'));
  }
  return frames
} 


const Utils = {
  normalize({x, y}) {
    let normx, normy
    const norm = Math.sqrt(x * x + y * y);
    if (norm !== 0) { // as3 return 0,0 for a point of zero length
      normx = x / norm;
      normy = y / norm;
    }
    return {
      x: normx, 
      y: normy
    }
  },

  dotProduct(a, b) {
    return a.x * b.x + a.y * b.y
  },

  lerp(a, b, n) {
    // return (1 - n) * a + n * b
    return (b - a) * n + a
  }
}


