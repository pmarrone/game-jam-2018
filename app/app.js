var app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
document.body.appendChild(app.view);

const Textures = {
  node: PIXI.Texture.fromImage('/assets/images/node.png'),
  source: PIXI.Texture.fromImage('/assets/images/source.png')
}

const Colors = {
  blue: 0x09B6FF,
  yellow: 0xF8FF09,
  orange: 0xE88D08,
  red: 0xFF040B,
  purple: 0xAB82E8
}

class Node {
  constructor(x, y) {
    this.child = new PIXI.Sprite(Textures.node)
    this.child.x = x
    this.child.y = y
    this.child.anchor.set(0.5)
    this.dst = []
  }

  update(delta) {
    this.child.x += Math.sin(new Date().getDate() / 100 + Math.random() * 6)
    this.child.y += Math.sin(new Date().getDate() / 100 + Math.random() * 6) 
    // this.child.rotation += 0.1 * delta
  }
}

class Arc {
  constructor(a, b) {
    this.child = new PIXI.Graphics()
    this.line = this.child
    this.a = a
    this.b = b
    a.dst.push(b)
    b.dst.push(a)
  }

  draw() { 
    const line = this.line, a = this.a, b = this.b
    line.clear()
    line.lineStyle(4, 0xffd900, 1);
    line.moveTo(a.child.x, a.child.y)
    line.lineTo(b.child.x, b.child.y)
  }
}

class Source {
  constructor(x, y, color) {
    this.color = color
    this.child = new PIXI.Sprite(Textures.source)
    this.child.x = x
    this.child.y = y
    this.child.anchor.set(0.5)
    this.dst = []
    this.child.tint = color
  }

  update(delta) {
    // this.child.rotation += 0.1 * delta
  }
}

class Game {
  constructor() {
    this.components = []
    app.ticker.add(delta => {
      this.update(delta)
    });
  }
  addComponent(component) {
    if (component.child) {
      app.stage.addChild(component.child)
    }
    this.components.push(component)
  }

  update(delta) {
    this.components.forEach(component => {
      if (component.update) {
        component.update(delta)
      }

      if (component.draw) {
        component.draw()
      }
    })
  }
}

function initLevel1() {
  const sources = {
    s1: new Source(400, 50, Colors.blue),
    s2: new Source(600, 500, Colors.red),
    s3: new Source(30, 500, Colors.yellow)
  }
  const nodes = {
    a: new Node(200, 500),
    b: new Node(400, 400),
    c: new Node(200, 200),
    d: new Node(500, 200)
  }
  const arcs = [
    new Arc(nodes.a, nodes.b),
    new Arc(nodes.b, nodes.c),
    new Arc(nodes.c, nodes.a),
    new Arc(nodes.c, nodes.d),
    new Arc(sources.s1, nodes.d),
    new Arc(sources.s2, nodes.a),
    new Arc(sources.s3, nodes.c)
  ]

  return {
    sources,
    nodes,
    arcs
  }
}

const game = new Game()

const level1 = initLevel1()

for (let node in level1.nodes) {
  game.addComponent(level1.nodes[node])
}
for (let source in level1.sources) {
  game.addComponent(level1.sources[source])
}
level1.arcs.forEach(arc => {
  game.addComponent(arc)
})

// Listen for animate update

