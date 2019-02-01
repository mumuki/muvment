function noop() {};

class State {
  constructor(name, movie) {
    this.movie = movie;
    this.name = name;
    this.callbacks = {
      end: noop,
      start: noop
    };
  }

  on(event, callback) {
    this.callbacks[event] = callback;
    return this;
  };

  onEnd(callback) {
    return this.on('end', callback);
  };

  onEndSwitch(character, stateName) {
    return this.onEnd(() => {
      return character.switch(stateName);
    });
  };

  onStart(callback) {
    return this.on('start', callback);
  };

  play(image) {
    this.callbacks.start();
    this.movie.play(image).then(this.callbacks.end.bind(this));
  };
};

module.exports = State;
