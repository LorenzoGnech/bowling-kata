class Bowling {
  constructor () {
    this.current = 0
    this.LAST_FRAME = 9

    this.inFrame = false

    this.frames = []
    this.bonusThrows = []
  }

  roll (pins) {
    if (this.isFinished()) throw new Error('Not possible to roll again: the game is over')
    if (this.current > this.LAST_FRAME) {
      this.bonusThrows.push(pins)
      return
    }

    if (this.inFrame) {
      const currentFrame = this.frames[this.current]
      currentFrame.second = pins

      const currentScore = this.getFrameScore(this.current)
      if (currentScore > 10) throw new Error('Not possible to knock down more than 10 pins in a frame')
      currentFrame.bonus = currentFrame.second && (currentScore === 10) ? 'spare' : null

      this.inFrame = false
      this.current++
      return
    }

    const isStrike = pins === 10
    this.frames[this.current] = {
      first: pins,
      second: null,
      bonus: isStrike ? 'strike' : null
    }
    this.inFrame = !isStrike
    if (isStrike) this.current++
  }

  getScore () {
    let score = this.frames.reduce((acc, curr, index) => {
      acc += this.getFrameScore(index)

      if (curr.bonus === 'spare') acc += (this.frames[index + 1]?.first || 0)
      if (curr.bonus === 'strike') {
        acc += (this.frames[index + 1]?.first || 0) + (this.frames[index + 1]?.second || this.frames[index + 2]?.first || 0)
        if (index === this.LAST_FRAME - 1 && this.frames[this.LAST_FRAME]?.bonus === 'strike') acc += this.bonusThrows[0] || 0
      }

      return acc
    }, 0)
    score += this.bonusThrows.reduce((a, b) => a + b, 0)

    return score
  }

  getFrameScore (index) {
    return (this.frames[index]?.first || 0) + (this.frames[index]?.second || 0)
  }

  isFinished () {
    const lastFrame = this.frames[this.LAST_FRAME]

    if (this.current > this.LAST_FRAME && lastFrame?.bonus === 'spare') return this.bonusThrows.length
    if (this.current > this.LAST_FRAME && lastFrame?.bonus === 'strike') return this.bonusThrows.length >= 2

    return (this.current > this.LAST_FRAME && !lastFrame?.bonus)
  }
}

module.exports = {
  Bowling
}
