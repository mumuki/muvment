class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.states = {};
  }

  addState(state) {
    if (!this.currentState) this.currentState = state;
    this.states[state.name] = state;
    return this;
  };

  switch(stateName) {
    this.currentState = this.states[stateName];
    this.play();
  };

  play() {
    this.currentState.play(this.canvas);
  };
};

module.exports = Scene;
