const bigFont = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440
})

const smallerFont = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 28,
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440
})

class Menu extends PIXI.Container {
  constructor(game) {
    super()
    const startText = new PIXI.Text('Start game!', bigFont)
    startText.x = 30
    startText.y = 180
    startText.buttonMode = true
    startText.interactive = true
    startText.on('pointerup', (event) => {
      game.startGame()
    });
    this.startText = startText
    this.addChild(this.startText)
  }
}

class LevelUI extends PIXI.Container {
  constructor(game) {
    super()
    const levelCompleted = new PIXI.Text('Level completed', bigFont)
    levelCompleted.x = 30
    levelCompleted.y = 180
    levelCompleted.buttonMode = true
    levelCompleted.interactive = true
    levelCompleted.on('pointerup', (event) => {
      game.startGame()
    });
    this.addChild(levelCompleted)

    const score = new PIXI.Text('Level completed with ' + game.currentLevel.deliveredStars + "/" + game.currentLevel.totalStars + " delivered stars.", smallerFont )
    score.x = 30
    score.y = 240
    this.addChild(score)
    const buttonsHeight = 340
    this.addChild(new UIButton('Retry', 30, buttonsHeight, () => game.startGame(game.levelIndex)))
    this.addChild(new UIButton('Next level', 190, buttonsHeight, () => game.startGame(game.levelIndex + 1)))
  }
}

class UIButton extends PIXI.Text {
  constructor(text, x, y, listener) {
    super(text, bigFont)
    this.x = x
    this.y = y
    this.buttonMode = true
    this.interactive = true
    this.on('pointerup', (event) => {
      listener()
    });
  }
}
