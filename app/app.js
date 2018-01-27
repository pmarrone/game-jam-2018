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
  findNodeByAngle(x, y) {
    let largestDotProduct = null
    let target = null
    if (!this.dst.length) {
      throw "Can't find targeted node because there are no linked nodes!"
    }
    this.dst.forEach(current => {
      const normMouse = Utils.normalize({x: x - this.child.x, y: y - this.child.y})
      const normTarget = Utils.normalize({x: current.child.x - this.child.x, y: current.child.y - this.child.y})
      const dotProduct = Utils.dotProduct(normMouse, normTarget)
      if (largestDotProduct !== null && largestDotProduct > dotProduct) {
        return
      }
      else {
        largestDotProduct = dotProduct
        target = current
      }
    })

    //debugGraphics.lineStyle(4, 0xffd900, 1);
    //debugGraphics.drawCircle(target.child.x, target.child.y, 30)
    return target
  }

  pointerUp(event) {
    const mousePosition = event.data.global
    console.log(mousePosition)
    //console.log(this)
    this.target = this.findNodeByAngle(mousePosition.x, mousePosition.y)
  }

  constructor(x, y) {
    const child = new PIXI.Sprite(Textures.node)
    child.interactive = true
    child.cursor = 'wait'
    // child.hitArea = new PIXI.Circle(0, 0, 25);
    this.child = child


    this.child.anchor.set(0.5)
    this.dst = []

    this.child.x = x
    this.child.y = y
    child.on('pointerdown', function(event) {

    })

    child.on('pointerupoutside', this.pointerUp.bind(this))
    child.on('pointerup', this.pointerUp.bind(this))
  }

  update(delta) {
    this.child.x += Math.sin(new Date().getDate() / 100 + Math.random() * 6)
    this.child.y += Math.sin(new Date().getDate() / 100 + Math.random() * 6)
    this.child.rotation = Math.atan2(this.target.child.y - this.child.y, this.target.child.x - this.child.x)
  }
}

class Package {
  constructor(currentNode) {
    this.currentNode = currentNode
    this.transition = 0
    this.targetNode = null
    this.update = Package.states.idle
  }

  startTransition(target) {
    if (this.update === Package.states.inTransit) {
      console.log("Can't move. Already in transit.")
      this.transition = 0
      this.targetNode = target
      this.update = Package.states.inTransit
    }
  }
}

Package.states = {
  idle: function (delta) {
      //noop
  },
  inTransit: function (delta) {
    this.transition += delta * 10
    if (this.transition >= 100) {
      this.update = Package.states.idle
    }
  }
}

class Arc {
  constructor(a, b) {
    this.child = new PIXI.Graphics()
    this.line = this.child
    this.line.z -= 10000
    this.a = a
    this.b = b
    a.dst.push(b)
    if (!a.target) {
      a.target = b
    }
    b.dst.push(a)
    if (!b.target) {
      b.target = a
    }
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


const debugGraphics = new PIXI.Graphics()

app.stage.addChild(debugGraphics)


const level1 = initLevel1()

level1.arcs.forEach(arc => {
  game.addComponent(arc)
})
for (let source in level1.sources) {
  game.addComponent(level1.sources[source])
}
for (let node in level1.nodes) {
  game.addComponent(level1.nodes[node])
}

spaceKey = keyboard(keyCodes.SPACE)
spaceKey.press = function () {
  debugGraphics.clear()
}


// Listen for animate update

