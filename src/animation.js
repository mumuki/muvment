let State = require('./state')
let Clip = require('./clip')

let $ = require('jquery')

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

function sequence(clips) {
  return new Animation(clips, (clips, where) => {
    let accum = Promise.resolve();

    clips.forEach((clip) =>
      accum = accum.then(() => 
        clip.play(where)));
    
    return accum;
  });
}

function oneOf(clips) {
  return new Animation(clips, (clips, where) => {
    return clips[Math.floor(Math.random() * clips.length)].play(where);
  });
}

function addImage(object, imageName, urlPrefix) {
  let url = urlPrefix + imageName + '.svg';
  if (object[imageName]) return Promise.resolve();

  return new Promise((resolve) => {
    $.get(url, (data) => {
      let duration = parseFloat($(data).find('animate').attr('dur') || 0, 10) * 1000;
      object[imageName] = new Clip('data:image/svg+xml;base64,' + btoa(data.documentElement.outerHTML), duration);
      resolve();
    });
  });
}

module.exports = {
  sequence: sequence,
  oneOf: oneOf,
  addImage: addImage
};
