class Menu extends PIXI.Container {
  constructor(game) {
    const startText = new PIXI.Text('Start game!', Menu.textStyle)
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

Menu.textStyle = new PIXI.TextStyle({
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