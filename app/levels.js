class Level {
  constructor({ routers, arcs, sources, deliveries, scheduler, game, maxMoves = 4 * Object.keys(sources).length, minStars = Math.ceil(deliveries.length * 0.60) }) {
    this.enabled = true
    this.routers = routers,
      this.sources = sources,
      this.arcs = arcs,
      this.deliveries = deliveries
    this.game = game,
      this.scheduler = scheduler

    this.totalStars = deliveries.length
    this.remainingStars = this.totalStars
    this.deliveredStars = 0
    this.maxMoves = maxMoves
    this.currentMoves = 0
    this.minStars = minStars
  }

  init() {
    this.scheduler.routers = this.routers
    this.scheduler.deliveries.push(...this.deliveries)

    let bgd = PIXI.Sprite.fromImage('assets/raw/fondos/fondo2.png');
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
    this.enabled = false
    this.scheduler.deliveries = []
  }

  packageDestroyed() {
    this.remainingStars -= 1
    if (this.remainingStars === 0) {
      this.showLevelComplete()
      this.game.removeComponent(this.hudComponent)
      console.log("Level ended with " + this.deliveredStars + " delivered stars")
    }
  }

  processNextTick() {
    this.currentMoves++
    if (this.currentMoves >= this.maxMoves) {
      for (let i in this.game.components) {
        if (this.game.components[i] instanceof Package) {
          const packet = this.game.components[i]
          packet.destroy()
          new LoseExplosion(packet.x, packet.y, Colors.orange)
        }
      }
      this.showLevelComplete()
    }
  }

  showLevelComplete() {
    this.enabled = false
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
    b: new Router(380, 40),
    c: new Router(500, 300),
    d: new Router(340, 450),
    e: new Router(700, 600)
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
  routers.d.target = routers.c

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
    sYellow: new Source(870, 70, Colors.yellow)
  }
  const routers = {
    a: new Router(130, 135),
    b: new Router(444, 65),
    c: new Router(555, 160),
    d: new Router(444, 295),
    e: new Router(333, 320),
    f: new Router(222, 535),
    g: new Router(555, 550),
    h: new Router(733, 160),
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

function initLevel7(scheduler, game) {
  const sources = {
    sBlue: new Source(650, 50, Colors.blue),
    sRed: new Source(400, 680, Colors.red),
    sYellow: new Source(400, 220, Colors.yellow)
  }
  const routers = {
    a: new Router(930, 185),
    c: new Router(120, 160),
    d: new Router(60, 465),
    f: new Router(360, 435),
    g: new Router(400, 550),
    h: new Router(510, 325),
  }
  const arcs = [
    new Arc(routers.a, routers.h),
    new Arc(routers.f, routers.g),
    new Arc(routers.d, routers.c),
    new Arc(routers.d, routers.f),
    new Arc(routers.h, routers.f),
    new Arc(sources.sBlue, routers.a),
    new Arc(sources.sRed, routers.d),
    new Arc(sources.sRed, routers.g),
    new Arc(sources.sBlue, routers.c),
    new Arc(sources.sYellow, routers.h),
    new Arc(sources.sYellow, routers.c)
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

function initLevel8(scheduler, game) {
  const sources = {
    sBlue: new Source(444, 325, Colors.blue),
    sRed: new Source(115, 560, Colors.red),
    sYellow: new Source(870, 70, Colors.yellow),
    sPurple: new Source(80, 70, Colors.purple)
  }
  const routers = {
    // a: new Router(140, 50),
    b: new Router(190, 135),
    c: new Router(310, 260),
    d: new Router(590, 240),
    e: new Router(733, 420),
    f: new Router(252, 455),
    g: new Router(755, 150),
    h: new Router(433, 160),
    ii: new Router(880, 500)
  }
  const arcs = [
    // new Arc(routers.a, routers.b),
    new Arc(routers.b, routers.c),
    new Arc(routers.h, routers.d),
    new Arc(routers.c, routers.h),
    // new Arc(routers.f, routers.sRed),
    // new Arc(routers.f, routers.sBlue),
    new Arc(routers.f, routers.e),
    new Arc(routers.g, routers.d),
    new Arc(routers.e, routers.ii),
    new Arc(routers.d, routers.e),
    new Arc(routers.c, routers.f),
    // new Arc(routers.c, routers.ii),
    new Arc(sources.sBlue, routers.c),
    new Arc(sources.sBlue, routers.d),
    new Arc(sources.sBlue, routers.e),
    new Arc(sources.sBlue, routers.f),
    new Arc(sources.sRed, routers.f),
    new Arc(sources.sYellow, routers.g),
    new Arc(sources.sPurple, routers.b)
  ]

  const deliveries = [
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.blue, 1),
    new Delivery(sources.sBlue, Colors.yellow, 1),
    new Delivery(sources.sPurple, Colors.purple, 1)

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

function initLevel9(scheduler, game) {
  const sources = {
    sBlue: new Source(895, 510, Colors.blue),
    sRed: new Source(935, 90, Colors.red),
    sYellow: new Source(535, 235, Colors.yellow),
    sPurple: new Source(140, 70, Colors.purple)
  }
  const routers = {
    a: new Router(110, 520),
    b: new Router(160, 645),
    c: new Router(170, 390),
    d: new Router(240, 230),
    e: new Router(433, 580),
    f: new Router(672, 555),
    g: new Router(635, 180),
    h: new Router(683, 345),
    ii: new Router(780, 110),
    j: new Router(822, 245),
    k: new Router(934, 185)
  }
  const arcs = [
    new Arc(routers.a, routers.b),
    new Arc(routers.a, routers.c),
    new Arc(routers.c, routers.d),
    new Arc(routers.c, routers.h),
    // new Arc(routers.d, routers.sRed),
    new Arc(routers.h, routers.f),
    new Arc(routers.h, routers.j),
    new Arc(routers.g, routers.ii),
    new Arc(routers.ii, routers.j),
    // new Arc(routers.ii, routers.sBlue),
    new Arc(routers.c, routers.e),
    new Arc(routers.j, routers.k),
    // new Arc(routers.j, routers.hsYellow),
    new Arc(sources.sRed, routers.ii),
    // new Arc(sources.sBlue, routers.d),
    new Arc(sources.sBlue, routers.h),
    new Arc(sources.sRed, routers.k),
    // new Arc(sources.sRed, routers.g),
    new Arc(sources.sYellow, routers.g),
    new Arc(sources.sYellow, routers.h),
    new Arc(sources.sYellow, routers.d),
    new Arc(sources.sPurple, routers.d)
  ]

  sources.sRed.target = routers.k
  // routers.d.target = routers.c
  
  
  const deliveries = [
    new Delivery(sources.sYellow, Colors.red, 0),
    new Delivery(sources.sRed, Colors.blue, 1),
    new Delivery(sources.sBlue, Colors.yellow, 1),
    new Delivery(sources.sPurple, Colors.purple, 1)

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
  initLevel6,
  initLevel7,
  initLevel8,
  initLevel9

]


