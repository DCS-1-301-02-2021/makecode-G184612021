scene.setBackgroundColor(6)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . 9 9 . . . 9 9 . . . .
    . . . . . 9 9 9 . 9 9 9 . . . .
    . 8 8 . . . . 9 9 9 . . . . . .
    8 8 8 . . . . . 9 . . . . . . .
    8 8 . . . 8 8 8 9 8 8 8 . . . .
    8 . . 8 8 8 8 8 8 8 8 f 8 . . .
    8 . 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    . . 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    . . . 1 1 1 1 1 1 1 1 1 1 1 . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . 9 9 . . . . .
            . . . . . . . . . . 9 6 6 8 . .
            . . . . . . . . . 9 6 8 8 8 8 .
            . . . . . . . . . 9 6 8 8 8 8 .
            . . . . . . . . . . 9 6 6 8 . .
            . . . . . . . . . 9 9 . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 8 . . . 8 . . . . . .
        . . . . . 8 8 . 8 8 . . . . . .
        . . . . . . 8 8 8 . . . . . . .
        . . . . . . . 8 . . . . . 3 3 3
        . . . 3 3 3 3 8 3 3 3 . . . 3 3
        . . 3 3 3 3 3 3 3 3 3 3 . . . 3
        . 3 a 3 3 3 3 3 3 3 3 3 3 . 3 3
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 .
        . c c c c c c c c c c c c . . .
        . . c c c c c c c c c c . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
