class Bowling {
  constructor () {
    this.current = 0
    this.LAST_FRAME = 9

    this.frames = []
    this.bonusThrows = []
  }

  roll (pins) {
    if (this.finished) throw new Error('Not possible to roll again: the game is over')
    if (this.inBonusThrows) {
      this.bonusThrows.push(pins)
      return
    }

    if (this.inFrame) {
      const currentFrame = this.frames[this.current]
      currentFrame.second = pins

      const currentScore = this.getFrameScore(this.current)
      if (currentScore > 10) throw new Error('Not possible to knock down more than 10 pins in a frame')
      currentFrame.bonus = currentFrame.second && (currentScore === 10) ? 'spare' : null

      this.current++
      return
    }

    const isStrike = pins === 10
    this.frames[this.current] = {
      first: pins,
      second: null,
      bonus: isStrike ? 'strike' : null
    }

    if (isStrike) this.current++
  }

  getScore () {
    const score = this.frames.reduce((partialScore, curr, frame) => {
      partialScore += this.getFrameScore(frame)

      const spareBonus = this.isSpare(frame) ? (this.frames[frame + 1]?.first || 0) : 0
      const strikeBonus = this.isStrike(frame) ? (this.frames[frame + 1]?.first || 0) + (this.frames[frame + 1]?.second || this.frames[frame + 2]?.first || 0) : 0

      return partialScore + spareBonus + strikeBonus
    }, 0)

    return score + this.bonusPoints
  }

  get finished () {
    const lastFrame = this.frames[this.LAST_FRAME]

    const noBonus = !lastFrame?.bonus
    const isSpareBonusCompleted = lastFrame?.bonus === 'spare' && this.bonusThrows.length === 1
    const isStrikeBonusCompleted = lastFrame?.bonus === 'strike' && this.bonusThrows.length === 2

    return this.inBonusThrows && (noBonus || isSpareBonusCompleted || isStrikeBonusCompleted)
  }

  get inBonusThrows () {
    return this.current > this.LAST_FRAME
  }

  get inFrame () {
    const currentFrame = this.frames[this.current]
    return !this.isStrike(currentFrame) && (currentFrame?.first && !currentFrame?.second)
  }

  get bonusPoints () {
    const bonusThrows = this.bonusThrows
    const bonusOnFrameNine = this.isStrike(this.LAST_FRAME - 1) && this.isStrike(this.LAST_FRAME) ? bonusThrows[0] : 0

    return bonusThrows.reduce((a, b) => a + b, 0) + bonusOnFrameNine
  }

  getFrameScore (index) {
    return (this.frames[index]?.first || 0) + (this.frames[index]?.second || 0)
  }

  isStrike (index) {
    return this.frames[index]?.bonus === 'strike'
  }

  isSpare (index) {
    return this.frames[index]?.bonus === 'spare'
  }
}

module.exports = {
  Bowling
}
