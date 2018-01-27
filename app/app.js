var app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
document.body.appendChild(app.view);

const Textures = {
  node: PIXI.Texture.fromImage('/assets/images/node.png')
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
    new Arc(nodes.c, nodes.d)
  ]

  return {
    nodes,
    arcs
  }
}

const game = new Game()

const level1 = initLevel1()

for (let node in level1.nodes) {
  game.addComponent(level1.nodes[node])
}
level1.arcs.forEach(arc => {
  game.addComponent(arc)
})

graphics.lineStyle(4, 0xffd900, 1);

// draw a shape
graphics.moveTo(200,200);
graphics.lineTo(450, 500);



// Listen for animate update

