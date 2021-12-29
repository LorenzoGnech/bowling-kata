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
