class Animation {
  constructor(clips, player) {
    this.clips = clips;
    this.player = player;
  }

  play(where) {
    return this.player(this.clips, where);
  };

  asState(name) {
    return new State(name, this);
  }
};

module.exports = Animation;
