var app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});

document.body.appendChild(app.view);

class Package {
  constructor(currentRouter, color) {
    this.color = color
    this.child = new PIXI.Sprite(Textures.package)
    this.child.tint = color
    this.child.x = currentRouter.child.x
    this.child.y = currentRouter.child.y
    this.child.anchor.set(0.5)
    this.currentRouter = currentRouter
    this.transition = 0
    this.targetRouter = currentRouter.target
    this.update = Package.states.inTransit
  }

  destroy () {
    game.removeComponent(this)
  }

  startTransition(target) {
    if (this.update === Package.states.inTransit) {
      console.log("Can't move. Already in transit.")
    } else {
      this.transition = 0
      this.targetRouter = target
      this.update = Package.states.inTransit
    }
  }
}

Package.states = {
  idle: function (delta) {
      //noop
  },
  inTransit: function (delta) {
    // console.log(`In transit!! Transition: ${this.transition}`)
    this.transition +=  delta * 0.02 * game.speed
    const box = this.child
    if (this.transition >= 1) {
      this.transition = 1
      console.log("Done!")
      this.currentRouter = this.targetRouter
      this.update = Package.states.idle
      this.currentRouter.packageArrived && this.currentRouter.packageArrived(this)
    }
    box.x = Utils.lerp(this.currentRouter.child.x, this.targetRouter.child.x, this.transition)
    box.y = Utils.lerp(this.currentRouter.child.y, this.targetRouter.child.y, this.transition)
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

  packageArrived(packet) {
    if (packet.color === this.color) {
      console.log("Packet arrived correctly")
    } else {
      console.log("Packaged arrived at the wrong location")
    }
    packet.destroy()
  }
}

class Game {
  constructor() {
    this.speed = 1
    this.toRemove = []
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

  removeComponent(component) {
    this.toRemove.push(component)
    app.stage.removeChild(component.child)
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

    while (this.toRemove.length) {
      const nextToRemove = this.toRemove.shift()
      this.components.splice(this.components.indexOf(nextToRemove), 1);
    }
  }
}

class Delivery {
  constructor(fromRouter, color, sinceNow) {
    this.fromRouter = fromRouter,
    this.color = color,
    this.sinceNow = sinceNow
  }
}

class PackageScheduler {
  constructor() {
    this.deliveries = []
    this.routers = {}
    
    setInterval(() => this.processRoutersTick(), 1500)
  }

  processRoutersTick() {
    for (let i in this.routers) {
      this.routers[i].processTick()
    }
  }

  scheduleNext() {
    if (this.deliveries.length) {
      const current = this.deliveries.shift()
      setTimeout(function() {
        game.addComponent(new Package(current.fromRouter, current.color))
        this.scheduleNext()
      }.bind(this), current.sinceNow / game.speed)
    }
  }

  start() {
    this.scheduleNext()
  }
}

function initLevel1(scheduler) {
  const sources = {
    sBlue: new Source(400, 50, Colors.blue),
    sRed: new Source(600, 500, Colors.red),
    sYellow: new Source(30, 500, Colors.yellow)
  }
  const routers = {
    a: new Router(200, 500),
    b: new Router(400, 400),
    c: new Router(200, 200),
    d: new Router(500, 200),
    e: new Router(600, 400)
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.b, routers.c),
    new Arc(routers.b, routers.e),
    new Arc(routers.c, routers.a),
    new Arc(routers.c, routers.d),
    new Arc(sources.sBlue, routers.d),
    new Arc(sources.sRed, routers.e),
    new Arc(sources.sYellow, routers.c)
  ]
  const packages = [
  //  new Package(routers.a,Colors.blue),
  //  new Package(routers.b),
  //  new Package(routers.c)
  ]

  scheduler.deliveries.push(
    //new Delivery(sources.sBlue, Colors.blue, 1000),
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.yellow, 0),
    //new Delivery(sources.sYellow, Colors.red, 1000)
    new Delivery(sources.sBlue, Colors.blue, 0)
    // new Delivery(sources.sBlue, Colors.red, 3000),
    // new Delivery(sources.sRed, Colors.blue, 1000),
    // new Delivery(sources.sBlue, Colors.yellow, 1000),
    // new Delivery(sources.sYellow, Colors.red, 2000),
    // new Delivery(sources.sBlue, Colors.blue, 1000),
    // new Delivery(sources.sYellow, Colors.red, 2000),
    // new Delivery(sources.sRed, Colors.yellow, 2000),
    // new Delivery(sources.sYellow, Colors.red, 1000),
    // new Delivery(sources.sRed, Colors.blue, 2000),
    // new Delivery(sources.sBlue, Colors.red, 2000),
    // new Delivery(sources.sRed, Colors.blue, 4000),
    // new Delivery(sources.sBlue, Colors.yellow, 1000),
    // new Delivery(sources.sYellow, Colors.red, 3000)
  )
  scheduler.routers = routers
  scheduler.scheduleNext()


  return {
    sources,
    routers,
    arcs,
    packages
  }
}

const game = new Game()

const debugGraphics = new PIXI.Graphics()

app.stage.addChild(debugGraphics)

const scheduler = new PackageScheduler();
const level1 = initLevel1(scheduler)

level1.arcs.forEach(arc => {
  game.addComponent(arc)
})
for (let source in level1.sources) {
  game.addComponent(level1.sources[source])
}
for (let Router in level1.routers) {
  game.addComponent(level1.routers[Router])
}
level1.packages.forEach(package => {
  game.addComponent(package)
})

sKey = keyboard(keyCodes.S)
spaceKey = keyboard(keyCodes.SPACE)
aKey = keyboard(keyCodes.A)

spaceKey.press = function () {
  debugGraphics.clear()
}
aKey.press = () => {
  console.log("Doing stuff?")
  const package = level1.packages[0]
  package.startTransition(package.currentRouter.target)
}

sKey.press = () => {
  scheduler.processRoutersTick()
}


// Listen for animate update

