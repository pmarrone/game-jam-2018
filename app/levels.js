class Level {
  constructor({ routers, arcs, sources, deliveries, scheduler, game }) {
    this.routers = routers,
      this.sources = sources,
      this.arcs = arcs,
      this.deliveries = deliveries
    this.game = game,
      this.scheduler = scheduler

    this.totalStars = deliveries.length
    this.remainingStars = this.totalStars
    this.deliveredStars = 0
  }

  init() {
    this.scheduler.routers = this.routers
    this.scheduler.deliveries.push(...this.deliveries)

    let bgd = PIXI.Sprite.fromImage('assets/raw/fondos/fondo1.png');
    bgd.scale.x = 1.5;
    bgd.scale.y = 1.5;
    bgd.tint = 0x776776
    app.stage.addChild(bgd);

    this.arcs.forEach(arc => {
      this.game.addComponent(arc)
    })
    for (let source in this.sources) {
      this.game.addComponent(this.sources[source])
    }
    for (let router in this.routers) {
      this.game.addComponent(this.routers[router])
    }

    const levelHud = new Hud(this.game)
    this.hudComponent = {
      child: levelHud,
      update() {
        levelHud.update()
      }
    }
    this.game.addComponent(this.hudComponent)
  }

  end() {
    this.scheduler.deliveries = []
    this.game.components.forEach(component => {
      this.game.removeComponent(component)
    })
  }

  packageDestroyed() {
    this.remainingStars -= 1
    if (this.remainingStars === 0) {
      this.showLevelComplete()
      this.game.removeComponent(this.hudComponent)
      console.log("Level ended with " + this.deliveredStars + " delivered stars")
    }
  }

  showLevelComplete() {
    app.stage.addChild(new LevelUI(game))

  }

  packageDelivered() {
    this.deliveredStars += 1
  }
}

function initLevel1(scheduler, game) {
  const sources = {
    sBlue: new Source(600, 200, Colors.blue),
    sRed: new Source(200, 400, Colors.red),
  }
  const routers = {
    a: new Router(350, 400),
    b: new Router(500, 400),
    e: new Router(300, 200)
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.b, routers.e),
    new Arc(sources.sBlue, routers.b),
    new Arc(sources.sRed, routers.e),
  ]

  const deliveries = [
    new Delivery(sources.sRed, Colors.blue, 0),
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

function initLevel3(scheduler) {
  const sources = {
    sBlue: new Source(710, 300, Colors.blue),
    sRed: new Source(100, 150, Colors.red),
  }
  const routers = {
    a: new Router(235, 185),
    b: new Router(380, 235),
    c: new Router(500, 300),
    d: new Router(520, 430),
    e: new Router(670, 450)
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.b, routers.c),
    new Arc(routers.d, routers.e),
    new Arc(routers.c, routers.d),
    new Arc(sources.sBlue, routers.c),
    new Arc(sources.sBlue, routers.e),
    new Arc(sources.sRed, routers.a),
  ]
  const packages = [
  ]

  const deliveries = [
    new Delivery(sources.sRed, Colors.blue, 0),
    new Delivery(sources.sBlue, Colors.red, 3),
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

function initLevel2(scheduler) {
  const sources = {
    sBlue: new Source(480, 400, Colors.blue),
    sRed: new Source(280, 500, Colors.red),
  }
  const routers = {
    a: new Router(330, 435),
    b: new Router(300, 235),
    c: new Router(400, 150),
    d: new Router(520, 235),
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.b, routers.c),
    new Arc(routers.d, routers.b),
    new Arc(routers.c, routers.d),
    new Arc(sources.sBlue, routers.d),
    new Arc(sources.sRed, routers.a),
  ]

  const deliveries = [
    new Delivery(sources.sRed, Colors.blue, 0),
    new Delivery(sources.sBlue, Colors.red, 0),
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

function initLevel4(scheduler, game) {
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
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.yellow, 1),
    new Delivery(sources.sBlue, Colors.red, 1),
    new Delivery(sources.sYellow, Colors.blue, 3),
    new Delivery(sources.sBlue, Colors.yellow, 2),
    new Delivery(sources.sRed, Colors.blue, 0),
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

function initLevel5(scheduler, game) {
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
    new Arc(sources.sBlue, routers.ii),
    new Arc(sources.sRed, routers.d),
    new Arc(sources.sRed, routers.e),
    new Arc(sources.sYellow, routers.h)
  ]

  const deliveries = [
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.blue, 1),
    new Delivery(sources.sBlue, Colors.yellow, 1)
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

function initLevel6(scheduler, game) {
  const sources = {
    sBlue: new Source(680, 400, Colors.blue),
    sRed: new Source(120, 300, Colors.red),
    sYellow: new Source(630, 70, Colors.yellow)
  }
  const routers = {
    a: new Router(130, 135),
    b: new Router(444, 65),
    c: new Router(555, 160),
    d: new Router(444, 295),
    e: new Router(333, 320),
    f: new Router(222, 535),
    g: new Router(555, 550),
    h: new Router(333, 160),
    ii: new Router(715, 260)
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.a, routers.e),
    new Arc(routers.b, routers.c),
    new Arc(routers.c, routers.d),
    new Arc(routers.c, routers.h),
    new Arc(routers.f, routers.g),
    new Arc(routers.e, routers.f),
    new Arc(routers.d, routers.g),
    new Arc(routers.c, routers.ii),
    new Arc(sources.sBlue, routers.ii),
    new Arc(sources.sRed, routers.e),
    new Arc(sources.sYellow, routers.h)
  ]

  const deliveries = [
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.blue, 1),
    new Delivery(sources.sBlue, Colors.yellow, 1)
    
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

const levels = [
  initLevel1,
  initLevel2,
  initLevel3,
  initLevel4,
  initLevel5,
  initLevel6

]


