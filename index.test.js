const test = require('ava')
const { Bowling } = require('.')

const multipleRolls = (game, rolls) => {
  rolls.forEach(pins => {
    game.roll(pins)
  })
}

test('Score should be 0 if no pins have been knocked down', t => {
  const game = new Bowling()

  const score = game.getScore()

  t.is(score, 0)
})

test('Should correctly keep track of the score', t => {
  const game = new Bowling()
  multipleRolls(game, [6, 3, 5, 2])

  const score = game.getScore()

  t.is(score, 16)
})

test('Should return the partial score even if a frame is not yet finished', t => {
  const game = new Bowling()
  multipleRolls(game, [5, 4, 6])

  const score = game.getScore()

  t.is(score, 15)
})

test('Should throw if given an invalid sequence of rolls', t => {
  const game = new Bowling()
  multipleRolls(game, [5, 4, 6])

  const { message } = t.throws(() => game.roll(7))

  t.is(message, 'Not possible to knock down more than 10 pins in a frame')
})

test('Should correctly add the bonus for a spare', t => {
  const game = new Bowling()
  multipleRolls(game, [5, 5, 6, 2])

  const score = game.getScore()

  t.is(score, 24)
})

test('Should add the spare bonus even for an uncompleted frame afterwards', t => {
  const game = new Bowling()
  multipleRolls(game, [5, 5, 1])

  const score = game.getScore()

  t.is(score, 12)
})

test('Should handle multiple spare bonus in a row', t => {
  const game = new Bowling()
  multipleRolls(game, [5, 5, 4, 6, 2, 3])

  const score = game.getScore()

  t.is(score, 31)
})

test('Should handle spare with no following roll', t => {
  const game = new Bowling()
  multipleRolls(game, [9, 1])

  const score = game.getScore()

  t.is(score, 10)
})

test('Should correctly award the bonus points for a strike', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 1, 8])

  const score = game.getScore()

  t.is(score, 28)
})

test('Should correctly handle a strike with no following roll', t => {
  const game = new Bowling()
  multipleRolls(game, [2, 1, 10])

  const score = game.getScore()

  t.is(score, 13)
})

test('Should correctly handle multiple strikes', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 4, 2])

  const score = game.getScore()

  t.is(score, 76)
})

test('Should throw if the game is past the tenth frame', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 1])

  const { message } = t.throws(() => game.roll(7))

  t.is(message, 'Not possible to roll again: the game is over')
})

test('Should return the correct score for a complete match', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 10, 10, 10, 7, 1, 10, 10, 8, 1])

  const score = game.getScore()

  t.is(score, 229)
})

test('Should allow to complete the bonus if a spare is made on the last frame', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 10, 10, 10, 7, 1, 10, 10, 8, 2, 5])

  const score = game.getScore()

  t.is(score, 236)
})

test('Should not allow two bonus throws if a spare is made on the last frame', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 10, 10, 10, 7, 1, 10, 10, 8, 2, 5])

  const { message } = t.throws(() => game.roll(1))

  t.is(message, 'Not possible to roll again: the game is over')
})

test('Should allow to complete the bonus if a strike is made on the last frame', t => {
  const game = new Bowling()
  multipleRolls(game, [5, 5, 6, 3, 7, 3, 3, 2, 2, 4, 5, 4, 10, 10, 8, 1, 10, 10, 10])

  const score = game.getScore()

  t.is(score, 144)
})

test('Should handle all strikes', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])

  const score = game.getScore()

  t.is(score, 300)
})

test('Should throw if given more than the maximum amount of rolls possible', t => {
  const game = new Bowling()
  multipleRolls(game, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])

  const { message } = t.throws(() => game.roll(10))

  t.is(message, 'Not possible to roll again: the game is over')
})
