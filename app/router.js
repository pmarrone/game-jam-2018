class Router {
  constructor(x, y) {

    this.packets = []
    const child = new PIXI.Sprite(Textures.router)
    const rings = new PIXI.Sprite(Textures.ring)
    rings.x = -45.1
    rings.y = -38
    rings.scale.x = 1.5
    rings.scale.y = 1.5
    child.addChild(rings)
    child.interactive = true
    child.hitArea = new PIXI.Circle(0, 0, 80);
    // this.ring.scale = 2
    this.child = child
    this.child.anchor.set(.25,.5)
    this.dst = []
    this.child.scale.x  = 1.2
    this.child.scale.y  = 1.2
    this.child.x = x
    this.child.y = y
    
    // this.aaaa.scale.x = 2
    // this.aaaa.scale.y = 2
    child.on('pointerdown', function(event) {

    })

    child.on('pointerupoutside', this.pointerUp.bind(this))
    child.on('pointerup', this.pointerUp.bind(this))
  }

  findRouterByAngle(x, y) {
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

  pointerUp(event) {Router
    const mousePosition = event.data.global
    this.target = this.findRouterByAngle(mousePosition.x, mousePosition.y)
  }

  update(delta) {
    //this.child.x += Math.sin(new Date().getDate() / 100 + Math.random() * 6)
    //this.child.y += Math.sin(new Date().getDate() / 100 + Math.random() * 6)
    this.child.rotation = Math.atan2(this.target.child.y - this.child.y, this.target.child.x - this.child.x)

  }

  packageArrived(packet) {
    if (this.packets.length) {
      this.packets.forEach(packet => packet.destroy())
      packet.destroy()
      new LoseExplosion(packet.x, packet.y, Colors.orange)
      return
    }
    this.packets.push(packet)
  }

  processTick() {
    let packet = this.packets.shift()
    if (packet) {
      packet.startTransition(this.target)
    }
  }
  
}
