class Bowling {
  constructor () {
    this.current = 0
    this.inFrame = false
    this.frames = []
  }

  roll (pins) {
    if (this.inFrame) {
      if (this.frames[this.current].first + pins > 10) throw new Error('Not possible to knock down more than 10 pins in a frame')
      this.frames[this.current++].second = pins
      this.inFrame = false
      return
    }

    this.frames[this.current] = {
      first: pins,
      second: null
    }
    this.inFrame = true
  }

  getScore () {
    return this.frames.reduce((acc, curr) => {
      acc += curr.first + curr.second
      return acc
    }, 0)
  }
}

module.exports = {
  Bowling
}
