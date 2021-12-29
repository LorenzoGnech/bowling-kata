class Bowling {
  constructor () {
    this.current = 0
    this.inFrame = false
    this.frames = []
  }

  roll (pins) {
    if (this.current > 9 && (!this.frames[9].bonus || (this.frames[9].bonus === 'spare' && this.inFrame))) throw new Error('Not possible to roll again: the game is over')

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
    return this.frames.reduce((acc, curr, index) => {
      acc += this.getFrameScore(index)

      if (curr.bonus === 'spare' && index < 9) acc += (this.frames[index + 1]?.first || 0)
      if (curr.bonus === 'strike' && index < 9) acc += (this.frames[index + 1]?.first || 0) + (this.frames[index + 1]?.second || this.frames[index + 2]?.first || 0)

      return acc
    }, 0)
  }

  getFrameScore (index) {
    return (this.frames[index]?.first || 0) + (this.frames[index]?.second || 0)
  }
}

module.exports = {
  Bowling
}
