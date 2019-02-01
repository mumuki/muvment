class Scene {
  constructor() {
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

  play(image) {
    this.currentState.play(image);
  };
};

module.exports = Scene;
