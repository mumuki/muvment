let State = require('./state')

class Clip {
  constructor(src, duration) {
    this.src = src;
    this.duration = duration;
  }

  play(where) {
    where.attr('src', this.src);
    
    return new Promise((resolve) => {
      setTimeout(resolve, this.duration);
    });
  }

  asState(name) {
    return new State(name, this);
  }
};

module.exports = Clip;
