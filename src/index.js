let Animation = require('./animation')
let Scene = require('./scene')
let State = require('./state')
let Clip = require('./clip')
let Character = require('./character')

let $ = require('jquery')

let muvment = {};

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
      object[imageName] = new Clip(url, duration);
      resolve();
    });
  });
}

muvment.State = State;
muvment.Scene = Scene;
muvment.Clip = Clip;
muvment.Character = Character;

muvment.animation = {
  sequence: sequence,
  oneOf: oneOf,
  addImage: addImage
};

module.exports = muvment;
