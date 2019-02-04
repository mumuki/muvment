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

  beforeEach(() => {
    spy1.resetHistory();
    spy2.resetHistory();
    spy3.resetHistory();
  });

  describe('Clip', () => {
    context('play', () => {
      it('changes the image src', async () => {
        let image = {};
        
        await new muvment.Clip('some/source', 10).play(image);

        assert.equal(image.src, 'some/source');
      });
    });
  });

  describe('Animation', () => {
    context('sequence', () => {
      it('plays every clip sequentially', async () => {
        let animation = muvment.animation.sequence([clip1, clip2, clip3]);

        await animation.play({});

        sinon.assert.callOrder(spy1, spy2, spy3);
      });
    });

    context('oneOf', () => {
      it('plays only one clip randomly', async () => {
        let animation = muvment.animation.oneOf([clip1, clip1, clip1]);

        await animation.play({});

        sinon.assert.calledOnce(spy1);
      });
    });
  });

  describe('State', () => {
    context('play', () => {
      it('calls start and end callbacks before and after animation', async () => {
        let state = muvment.animation.sequence([clip1, clip2, clip3]).asState();

        let stateStartSpy = sinon.spy();
        let stateEndSpy = sinon.spy();

        state.onStart(stateStartSpy);
        state.onEnd(stateEndSpy);

        await state.play({});

        sinon.assert.callOrder(stateStartSpy, spy1, spy2, spy3, stateEndSpy);
      });
    });
  });
});
