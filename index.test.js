const test = require('ava')
const { Bowling } = require('.')

test('Step 1 - score should be 0 if no pins have been knocked down', t => {
  const game = new Bowling()

  const score = game.getScore()

  t.is(score, 0)
})

test('Step 1 - should correctly keep track of the score', t => {
  const game = new Bowling()
  game.roll(6)
  game.roll(3)
  game.roll(5)
  game.roll(2)

  const score = game.getScore()

  t.is(score, 16)
})

test('Step 1 - should return the partial score even if a frame is not yet finished', t => {
  const game = new Bowling()
  game.roll(5)
  game.roll(4)
  game.roll(6)

  const score = game.getScore()

  t.is(score, 15)
})

test('Step 1 - should throw if given an invalid sequence of rolls', t => {
  const game = new Bowling()
  game.roll(5)
  game.roll(4)
  game.roll(6)
  const { message } = t.throws(() => game.roll(7))

  t.is(message, 'Not possible to knock down more than 10 pins in a frame')
})

test('Step 2 - should correctly add the bonus for a spare', t => {
  const game = new Bowling()
  game.roll(5)
  game.roll(5)
  game.roll(6)
  game.roll(2)

  const score = game.getScore()

  t.is(score, 24)
})

test('Step 2 - should add the spare bonus even for an uncompleted frame afterwards', t => {
  const game = new Bowling()
  game.roll(5)
  game.roll(5)
  game.roll(1)

  const score = game.getScore()

  t.is(score, 12)
})

test('Step 2 - should handle multiple spare bonus in a row', t => {
  const game = new Bowling()
  game.roll(5)
  game.roll(5)
  game.roll(4)
  game.roll(6)
  game.roll(2)
  game.roll(3)

  const score = game.getScore()

  t.is(score, 31)
})

test('Step 2 - should handle spare with no following roll', t => {
  const game = new Bowling()
  game.roll(9)
  game.roll(1)

  const score = game.getScore()

  t.is(score, 10)
})

test('Step 3 - should correctly award the bonus points for a strike', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(1)
  game.roll(8)

  const score = game.getScore()

  t.is(score, 28)
})

test('Step 3 - should correctly handle a strike with no following roll', t => {
  const game = new Bowling()
  game.roll(2)
  game.roll(1)
  game.roll(10)

  const score = game.getScore()

  t.is(score, 13)
})

test('Step 3 - should correctly handle multiple strikes', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(4)
  game.roll(2)

  const score = game.getScore()

  t.is(score, 76)
})

test('Step 4 - should throw if the game is past the tenth frame', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(8)
  game.roll(1)
  const { message } = t.throws(() => game.roll(7))

  t.is(message, 'Not possible to roll again: the game is over')
})

test('Step 4 - should return the correct score for a complete match', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(7)
  game.roll(1)
  game.roll(10)
  game.roll(10)
  game.roll(8)
  game.roll(1)

  const score = game.getScore()

  t.is(score, 229)
})

test('Step 4 - should allow to complete the bonus if a spare is made on the last frame', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(7)
  game.roll(1)
  game.roll(10)
  game.roll(10)
  game.roll(8)
  game.roll(2)
  game.roll(5)

  const score = game.getScore()

  t.is(score, 236)
})

test('Step 4 - should not allow two bonus throws if a spare is made on the last frame', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(7)
  game.roll(1)
  game.roll(10)
  game.roll(10)
  game.roll(8)
  game.roll(2)
  game.roll(5)
  const { message } = t.throws(() => game.roll(1))

  t.is(message, 'Not possible to roll again: the game is over')
})

test('Step 4 - should allow to complete the bonus if a strike is made on the last frame', t => {
  const game = new Bowling()
  game.roll(5)
  game.roll(5)
  game.roll(6)
  game.roll(3)
  game.roll(7)
  game.roll(3)
  game.roll(3)
  game.roll(2)
  game.roll(2)
  game.roll(4)
  game.roll(5)
  game.roll(4)
  game.roll(10)
  game.roll(10)
  game.roll(8)
  game.roll(1)
  game.roll(10)
  game.roll(10)
  game.roll(10)

  const score = game.getScore()

  t.is(score, 144)
})

test('Step 4 - should handle all strikes', t => {
  const game = new Bowling()
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)
  game.roll(10)

  const score = game.getScore()

  t.is(score, 300)
})
