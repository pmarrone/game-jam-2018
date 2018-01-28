const Colors = {
  blue: 0x09B6FF,
  yellow: 0xF8FF09,
  orange: 0xE88D08,
  red: 0xFF040B,
  purple: 0xAB82E8
}

const Textures = {
  router: PIXI.Texture.fromImage('assets/images/router.png'),
  source: PIXI.Texture.fromImage('assets/images/source.png'),
  package: PIXI.Texture.fromImage('assets/images/package.png')
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