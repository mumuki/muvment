let assert = require('assert')
let sinon = require('sinon');

let muvment = require('../src/index');


describe ('muvment', () => {
  let newClip = (src, duration) => {
    let clip = new muvment.Clip(src, duration);

    return { clip: clip, spy: sinon.spy(clip, 'play') };
  };

  let { clip: clip1, spy: spy1 } = newClip("some/source", 10);
  let { clip: clip2, spy: spy2 } = newClip("some/other/source", 20);
  let { clip: clip3, spy: spy3 } = newClip("yet/another/source", 30);
  let sequenceAnimation = muvment.animation.sequence([clip1, clip2, clip3]);
  let canvas = { attr: (attr, value) => { canvas[attr] = value; } }

  beforeEach(() => {
    spy1.resetHistory();
    spy2.resetHistory();
    spy3.resetHistory();
  });

  describe('Clip', () => {
    context('play', () => {
      it('changes the canvas src', async () => {
        await clip1.play(canvas);

        assert.equal(canvas.src, 'some/source');
      });
    });
  });

  describe('Animation', () => {
    context('sequence', () => {
      it('plays every clip sequentially', async () => {
        await sequenceAnimation.play(canvas);

        sinon.assert.callOrder(spy1, spy2, spy3);
      });
    });

    context('oneOf', () => {
      it('plays only one clip randomly', async () => {
        let animation = muvment.animation.oneOf([clip1, clip1, clip1]);

        await animation.play(canvas);

        sinon.assert.calledOnce(spy1);
      });
    });
  });

  describe('State', () => {
    context('play', () => {
      it('calls start and end callbacks before and after animation', async () => {
        let state = sequenceAnimation.asState();

        let stateStartSpy = sinon.spy();
        let stateEndSpy = sinon.spy();

        state.onStart(stateStartSpy);
        state.onEnd(stateEndSpy);

        await state.play(canvas);

        sinon.assert.callOrder(stateStartSpy, spy1, spy2, spy3, stateEndSpy);
      });
    });
  });

  describe('Character', () => {
    context('playAnimation', () => {
      it('plays an action if available', async () => {
        let character = new muvment.Character();

        character.actions = { run: sequenceAnimation }

        await character.playAnimation('run', canvas);

        sinon.assert.callOrder(spy1, spy2, spy3);
      });

      it('plays a clip if no action by that name', async () => {
        let character = new muvment.Character();

        character.clips = { run: clip1 }

        await character.playAnimation('run', canvas);

        sinon.assert.called(spy1);
      });

      it('does nothing if no actions or clips by that name', async () => {
        let character = new muvment.Character();

        character.actions = { run: sequenceAnimation }

        assert.doesNotThrow(async () => { await character.playAnimation('run', canvas) });

        sinon.assert.notCalled(spy1);
        sinon.assert.notCalled(spy2);
        sinon.assert.notCalled(spy3);
      });
    });
  });
});
