import React, { FunctionComponent } from 'react';
import { animated, interpolate, useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { Vector2 } from 'react-use-gesture/dist/types';
import { connect } from 'react-redux';

import { dislike, DISLIKE, like, LIKE, RESET, resetChoice } from './redux/actions';
import { LastChoiceState } from './redux/reducers';
import { CARDS_LENGTH } from './App';

const DISLIKE_DIR = -1;
const LIKE_DIR = 1;
const TRIGGER_THRESHOLD = 0.2;
type FlyOutDirection = typeof DISLIKE_DIR | typeof LIKE_DIR;

interface Props {
  index: number,
  image: string,
  lastChoice: LastChoiceState,
  like: Function,
  dislike: Function,
  resetChoice: Function,
}

const to = (i: number) => ({
  x: 0,
  y: Math.min(50, (CARDS_LENGTH - i - 1) * 25),
  rot: 0,
  scale: 1 - Math.min(0.1, (CARDS_LENGTH - i - 1) * 0.05),
  delay: 100 * i - 100,
  opacity: 1,
  likeOpacity: 0,
  dislikeOpacity: 0,
});
const from = () => ({
  x: 0,
  y: 0,
  rot: 0,
  scale: .01,
  opacity: 0,
  likeOpacity: 0,
  dislikeOpacity: 0,
});

const trans = (r: number, s: number) => `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const extractCardName = (image: string) => {
  return ((image.split('/').pop() || '').split('.').shift() || '').replace(/-/g, ' ');
};

const flyOut = (
  {
    set,
    flyOutDirection,
    xDelta,
    velocity,
  }: {
    set: Function,
    flyOutDirection: FlyOutDirection,
    xDelta: number,
    velocity: number,
  }) => {
  const likeOpacity: number = flyOutDirection === LIKE_DIR ? 2 : 0;
  const dislikeOpacity: number = flyOutDirection === DISLIKE_DIR ? 2 : 0;
  const x: number = (200 + window.innerWidth) * flyOutDirection;
  const rot: number = xDelta / 100 + flyOutDirection * 10 * velocity;
  const scale: number = 1;
  const tension: number = 220;

  set(() => ({
    x,
    rot,
    scale,
    likeOpacity,
    dislikeOpacity,
    delay: undefined,
    config: { friction: 40, tension },
  }));
};

const reset = (set: Function, index: number) => {
  set(() => ({
    x: 0,
    y: Math.min(50, (CARDS_LENGTH - index - 1) * 25),
    rot: 0,
    scale: 1 - Math.min(0.1, (CARDS_LENGTH - index - 1) * 0.05),
    delay: 200 * index,
    opacity: 1,
    likeOpacity: 0,
    dislikeOpacity: 0,
    config: { friction: 20, tension: 200 },
  }));
};

const Card: FunctionComponent<Props> = ({ index, image, lastChoice, ...actions }) => {
  const [props, set] = useSpring(() => ({ ...to(index), from: from() }));

  if (lastChoice.currentCardIndex === index && (lastChoice.type === LIKE || lastChoice.type === DISLIKE)) {
    flyOut({
      set,
      flyOutDirection: lastChoice.type === LIKE ? LIKE_DIR : DISLIKE_DIR,
      xDelta: 200,
      velocity: 0.8,
    });
  } else if (lastChoice.type === RESET) {
    reset(set, index);
  }

  const bind = useGesture((
    {
      down,
      delta: [xDelta],
      direction: [horizontalDirection],
      velocity,
      distance,
    }: {
      down: boolean;
      delta: Vector2;
      direction: Vector2;
      velocity: number;
      distance: number;
    }) => {
    const shouldFlyOut: boolean = !down && velocity > TRIGGER_THRESHOLD;
    const flyOutDirection: FlyOutDirection = horizontalDirection < 0 ? DISLIKE_DIR : LIKE_DIR;

    if (shouldFlyOut) {
      if (flyOutDirection === LIKE_DIR) {
        actions.like(lastChoice.currentCardIndex);
      } else if (flyOutDirection === DISLIKE_DIR) {
        actions.dislike(lastChoice.currentCardIndex);
      }
    } else {
      const likeOpacity = down && xDelta > 5 ? Math.min(1, distance / 150) : 0;
      const dislikeOpacity = down && xDelta < -5 ? Math.min(1, distance / 150) : 0;
      const x: number = down ? xDelta : 0;
      const rot: number = xDelta / 100;
      const scale: number = down ? 1.1 : 1;
      const tension: number = down ? 720 : 400;

      // @ts-ignore
      set(() => ({
        x,
        rot,
        scale,
        likeOpacity,
        dislikeOpacity,
        delay: undefined,
        config: { friction: 40, tension },
      }));
    }
  });

  // @ts-ignore
  const likeClassName = props.likeOpacity.value === 2 ? 'card-like hide' : 'card-like ';
  // @ts-ignore
  const dislikeClassName = props.dislikeOpacity.value === 2 ? 'card-dislike hide' : 'card-dislike';

  return (
    <animated.div key={index}
                  className="card-container"
                  style={{ transform: interpolate([props.x, props.y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
      <animated.div {...bind(index)}
                    className="card-image"
                    style={{
                      opacity: props.opacity,
                      // @ts-ignore
                      transform: interpolate([props.rot, props.scale], trans),
                      backgroundImage: `url(${image})`,
                    }}>
        <animated.div className={likeClassName} style={{ opacity: props.likeOpacity }}>LIKE</animated.div>
        <animated.div className={dislikeClassName} style={{ opacity: props.dislikeOpacity }}>DISLIKE</animated.div>
        <div className="card-title">{extractCardName(image)}</div>
      </animated.div>
    </animated.div>
  );
};

const mapStateToProps = (state: any) => {
  return { lastChoice: state.lastChoice };
};

export default connect(
  mapStateToProps,
  { like, dislike, resetChoice },
)(Card);
