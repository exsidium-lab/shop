import { useEffect } from 'react';

import { useRafState } from './use-raf-state';

type TWindowDimensions = {
  width: number;
  height: number;
};

const isClient = () => typeof window !== 'undefined';

export const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState<TWindowDimensions>({
    height: isClient() ? window.innerHeight : initialHeight,
    width: isClient() ? window.innerWidth : initialWidth,
  });

  useEffect((): (() => void) | void => {
    const handler = () => setState({ height: window.innerHeight, width: window.innerWidth });

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, [setState]);

  return state;
};
