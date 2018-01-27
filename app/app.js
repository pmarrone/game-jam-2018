var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

const Textures = {
  node: PIXI.Texture.fromImage('/assets/images/node.png')
}

class Node {
  constructor(x, y) {
    this.sprite = new PIXI.Sprite(Textures.node)
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.anchor.set(0.5)
  }

  update(delta) {
    console.log(delta)
    this.sprite.rotation += 0.1 * delta
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
    if (component.sprite) {
      app.stage.addChild(component.sprite)
    }
    this.components.push(component)
  }

  update(delta) {
    this.components.forEach(component => {
      if (component.update) {
        component.update(delta)
      }
    })
  }
}

const level1 = {
  nodes: {
    a: new Node(200, 500),
    b: new Node(400, 400),
    c: new Node(200, 200)
  }
}

const game = new Game()

for (let node in level1.nodes) {
  game.addComponent(level1.nodes[node])
}



// Listen for animate update

