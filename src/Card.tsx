import React, { FunctionComponent } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { Vector2 } from 'react-use-gesture/dist/types';

interface Props {
  index: number,
  image: string,
}

const to = (i: number) => ({
  x: 0,
  y: Math.min(i * -20, -60) + 80,
  scale: 1,
  rot: 0,
  delay: 100 * i - 100,
  opacity: 1,
});
const from = () => ({ x: 0, rot: 0, scale: .01, y: 0, opacity: 0 });

const trans = (r: number, s: number) => `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const extractCardName = (image: string) => {
  return ((image.split('/').pop() || '').split('.').shift() || '').replace(/-/g, ' ');
};

const Card: FunctionComponent<Props> = ({ index, image }) => {
  const [props, set] = useSpring(() => ({ ...to(index), from: from() }));

  const bind = useGesture((
    {
      down,
      delta: [xDelta],
      direction: [horizontalDirection],
      velocity,
    }: {
      down: boolean;
      delta: Vector2;
      direction: Vector2;
      velocity: number;
    }) => {
    const shouldFlyOut: boolean = !down && velocity > 0.2;
    const flyOutDirection: number = horizontalDirection < 0 ? -1 : 1;

    const x: number = shouldFlyOut
      ? (200 + window.innerWidth) * flyOutDirection
      : down ? xDelta : 0;
    const rot: number = xDelta / 100 + (shouldFlyOut ? flyOutDirection * 10 * velocity : 0);
    const scale: number = down ? 1.1 : 1;
    const tension: number = down
      ? 720
      : shouldFlyOut ? 220 : 400;

    // @ts-ignore
    set(() => ({
      x,
      rot,
      scale,
      delay: undefined,
      config: { friction: 40, tension },
    }));
  });

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
        <div className="card-title">{extractCardName(image)}</div>
      </animated.div>
    </animated.div>
  );
};

export default Card;
