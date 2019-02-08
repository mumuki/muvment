class Character {
  constructor() {
    this.clips = {};
    this.actions = {};
  }

  playAnimation(name, canvas) {
    let animation = this.actions[name] || this.clips[name]
    return animation && animation.play(canvas)
  }
};

module.exports = Character;
