let Character = require('./character')
let animation = require('./animation')

function loadCharacters(where, src){
  function loadAnimationGroup(animations) {
    return Object.keys(animations).map((character) => {
      newCharacter(character);

      return loadAnimations(character, animations[character].clips).then(() =>
        loadActions(character, animations[character].actions)).then(() =>
        character);
    });
  }

  function newCharacter(name) {
    where[name] = new Character();
  }

  function loadAnimations(character, animations) {
    return Promise.all(animations.map((svg) =>
      addClip(character, svg)));
  }

  function loadActions(character, actions) {
    Object.keys(actions || {}).forEach((action) =>
      addAction(character, action, parseAction(character, actions[action])));
  }

  function addAction(character, actionName, action) {
    where[character].actions[actionName] = action;
  }

  function parseAction(character, action) {
    if (!action.type) return where[character].clips[action];

    return animation[action.type](action.animations.map((animation) =>
      parseAction(character, animation)));
  }

  function addClip(character, name) {
    return animation.addImage(where[character].clips, name, `/character/${character}/`);
  }

  return $.get(src).then((animations) => {
    loadAnimationGroup(animations.extra);
    return loadAnimationGroup(animations.main);
  });
}

module.exports = loadCharacters;
