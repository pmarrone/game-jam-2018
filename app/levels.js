class Level {
  constructor({ routers, arcs, sources, deliveries, scheduler, game }) {
    this.routers = routers,
    this.sources = sources,
    this.arcs = arcs,
    this.deliveries = deliveries
    this.game = game,
    this.scheduler = scheduler
  }

  init() {
    this.scheduler.routers = this.routers
    this.scheduler.deliveries.push(...this.deliveries)

    this.arcs.forEach(arc => {
      this.game.addComponent(arc)
    })
    for (let source in this.sources) {
      this.game.addComponent(this.sources[source])
    }
    for (let router in this.routers) {
      this.game.addComponent(this.routers[router])
    }
  }

  end() {
    this.scheduler.deliveries = []
    this.game.components.forEach(component => {
      this.game.removeComponent(component)
    })
  }
}

function initLevel1(scheduler, game) {
  const sources = {
    sBlue: new Source(680, 400, Colors.blue),
    sRed: new Source(260, 300, Colors.red),
    sYellow: new Source(630, 70, Colors.yellow)
  }
  const routers = {
    a: new Router(130, 135),
    b: new Router(290, 65),
    c: new Router(380, 160),
    d: new Router(340, 295),
    e: new Router(170, 320),
    f: new Router(130, 535),
    g: new Router(400, 550),
    h: new Router(700, 160),
    ii: new Router(720, 260)
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.a, routers.e),
    new Arc(routers.b, routers.c),
    new Arc(routers.c, routers.d),
    new Arc(routers.c, routers.h),
    new Arc(routers.d, routers.g),
    new Arc(routers.g, routers.f),
    new Arc(routers.f, routers.e),
    new Arc(routers.h, routers.ii),
    // new Arc(sources.sBlue, routers.d),
    // new Arc(sources.sBlue, routers.d),
    new Arc(sources.sBlue, routers.ii),
    new Arc(sources.sRed, routers.d),
    new Arc(sources.sRed, routers.e),
    // new Arc(sources.sRed, routers.a),
    new Arc(sources.sYellow, routers.h)
  ]
  
  const deliveries = [
    //new Delivery(sources.sBlue, Colors.blue, 1000),
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.blue, 1),
    //new Delivery(sources.sYellow, Colors.red, 1000)
    // new Delivery(sources.sBlue, Colors.red, 0)
    // new Delivery(sources.sBlue, Colors.red, 3000),
    // new Delivery(sources.sRed, Colors.blue, 1000),
    new Delivery(sources.sBlue, Colors.yellow, 1)
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
  ]

  return new Level({
    sources,
    routers,
    arcs,
    deliveries,
    scheduler,
    game
  })
}


function initLevel2(scheduler, game) {
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
  const deliveries = [
    //new Delivery(sources.sBlue, Colors.blue, 1000),
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.yellow, 0),
    //new Delivery(sources.sYellow, Colors.red, 1000)
    new Delivery(sources.sBlue, Colors.blue, 0),
    new Delivery(sources.sBlue, Colors.red, 1),
    new Delivery(sources.sRed, Colors.blue, 1),
    new Delivery(sources.sBlue, Colors.yellow, 1)
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
  ]

  return new Level({
    sources,
    routers,
    arcs,
    deliveries,
    game,
    scheduler
  })
}

const levels = [
  initLevel1,
  initLevel2
]


