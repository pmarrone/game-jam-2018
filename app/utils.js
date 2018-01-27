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
  }
}